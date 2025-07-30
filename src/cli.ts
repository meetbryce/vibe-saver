#!/usr/bin/env node
import { execSync } from "child_process";
import { Command } from "commander";
import chalk from "chalk";
import { checkGitInstallation } from "./utils/gitCheck.js";
import { detectShell, installShellCompletion } from "./utils/shellUtils.js";

const runCmd = (cmd: string) => {
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch (err) {
    console.error(
      chalk.red(`Error: ${err instanceof Error ? err.message : String(err)}`)
    );
  }
};

const generateCompletionScript = (
  shell: string,
  commands: string[]
): string => {
  const cmdList = commands.join(" ");

  switch (shell) {
    case "bash":
      return `
_vibe_completion() {
  local cur prev opts
  COMPREPLY=()
  cur="\${COMP_WORDS[COMP_CWORD]}"
  prev="\${COMP_WORDS[COMP_CWORD-1]}"
  opts="${cmdList}"

  COMPREPLY=( $(compgen -W "\${opts}" -- \${cur}) )
  return 0
}
complete -F _vibe_completion vibe
`;

    case "zsh":
      return `
#compdef vibe

_vibe() {
  local -a commands
  commands=(
    ${commands.map((cmd) => `'${cmd}:${cmd} command'`).join("\n    ")}
  )
  
  _describe 'command' commands
}

compdef _vibe vibe
`;

    case "fish":
      return `
complete -c vibe -f
${commands
  .map(
    (cmd) =>
      `complete -c vibe -n "__fish_use_subcommand" -a "${cmd}" -d "${cmd} command"`
  )
  .join("\n")}
`;

    default:
      return "";
  }
};

async function installCompletions(commands: string[]): Promise<void> {
  try {
    const shell = detectShell();
    const completionScript = generateCompletionScript(shell.name, commands);

    const result = await installShellCompletion(completionScript, shell);

    if (result.success) {
      console.log(chalk.green(`✅ Success! ${result.message}`));
      console.log(chalk.yellow(`\nTo activate completions right away, run:`));
      console.log(chalk.cyan(`source ${shell.configFile}`));
    } else {
      console.log(chalk.yellow(`⚠️ ${result.message}`));
      console.log(chalk.yellow(`\nTo manually set up completions, run:`));
      console.log(
        chalk.cyan(`vibe completion ${shell.name} >> ${shell.configFile}`)
      );
    }
  } catch (err) {
    console.error(
      chalk.red(
        `Error setting up completions: ${
          err instanceof Error ? err.message : String(err)
        }`
      )
    );
  }
}

async function main() {
  // Check git installation first
  const gitInfo = await checkGitInstallation();

  if (!gitInfo.isInstalled) {
    console.error(chalk.red("Git is not installed! 😱"));
    console.log(chalk.yellow("\nTo install git, run:"));
    console.log(chalk.cyan(`\n${gitInfo.installCommand}\n`));
    console.log(chalk.yellow("After installing git, run vibe-saver again."));
    process.exit(1);
  }

  const program = new Command();

  const commands = [
    "start",
    "clone",
    "connect",
    "save",
    "sync",
    "pull",
    "undo",
    "status",
    "history",
    "publish",
    "help",
    "install",
  ];

  program
    .name("vibe")
    .description("vibe-saver: effortlessly save your vibes")
    .version("1.0.0")
    .enablePositionalOptions()
    .showHelpAfterError()
    .showSuggestionAfterError()
    .addHelpCommand("help [command]", "Display help for command")
    .configureHelp({
      sortSubcommands: true,
      sortOptions: true,
    });

  // Add shell completion support (hidden from normal help)
  program
    .command("completion", { hidden: true })
    .description("Generate shell completion script")
    .argument("[shell]", "Shell type (bash, zsh, fish)")
    .action((shell: string | undefined) => {
      const supported = ["bash", "zsh", "fish"] as const;
      type SupportedShell = (typeof supported)[number];
      const detectedShell =
        shell || process.env.SHELL?.split("/").pop() || "bash";

      if (!supported.includes(detectedShell as SupportedShell)) {
        console.error(chalk.red(`Unsupported shell: ${detectedShell}`));
        console.log(chalk.yellow("Supported shells: " + supported.join(", ")));
        process.exit(1);
      }

      const script = generateCompletionScript(detectedShell, commands);
      console.log(script);
    });

  // New install command for completions
  program
    .command("install")
    .description("Set up shell completions automatically")
    .action(async () => {
      console.log(chalk.green("Setting up shell completions..."));
      await installCompletions(commands);
    });

  program
    .command("start")
    .description(
      "Setup the current folder for vibe-saver to manage. You should generate a .gitignore file first in your editor."
    )
    .action(() => runCmd("git init"));

  program
    .command("clone <url>")
    .description("Grab vibes from the cloud")
    .action((url: string) => runCmd(`git clone ${url}`));

  program
    .command("connect <github_link>")
    .description("Connect your local folder to a GitHub repository")
    .action((githubLink: string) => {
      console.log(chalk.green("Connecting to GitHub repository..."));
      runCmd(`git remote add origin ${githubLink}`);
      runCmd("git branch -M main");
      runCmd("git push -u origin main");
      console.log(chalk.green("✅ Successfully connected to GitHub!"));
    });

  program
    .command("save <message>")
    .description("Save your current vibes")
    .action((msg: string) => runCmd(`git add . && git commit -m "${msg}"`));

  program
    .command("sync")
    .description("Sync your vibes to the cloud")
    .action(() => runCmd("git push"));

  program
    .command("pull")
    .description(
      "Get latest vibes from the cloud (if you're working on multiple computers)"
    )
    .action(() => runCmd("git pull"));

  program
    .command("undo")
    .description("Undo last vibe save")
    .action(() => runCmd("git reset --hard HEAD~1"));

  program
    .command("clear")
    .description("Clean up all changes since your last vibe save")
    .action(() => runCmd("git reset --hard HEAD"));

  program
    .command("status")
    .description("Check your current vibe status")
    .action(() => runCmd("git status"));

  program
    .command("history")
    .description("See your vibe history")
    .action(() => runCmd("git log --oneline --decorate"));

  program
    .command("publish <tag>")
    .description("Publish a stable vibe version")
    .action((tag: string) => runCmd(`git tag ${tag} && git push --tags`));

  // Try to set up completions automatically on first run
  if (process.argv.length <= 2) {
    // Only show when running just `vibe` with no arguments
    if (!process.env.VIBE_COMPLETIONS_CHECKED) {
      process.env.VIBE_COMPLETIONS_CHECKED = "true";
      console.log(
        chalk.blue("Tip: Set up shell completions with `vibe install`")
      );
    }
  }

  program.parse(process.argv);
}

main().catch(console.error);
