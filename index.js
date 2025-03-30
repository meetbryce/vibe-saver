#!/usr/bin/env node

const { execSync } = require("child_process");
const { Command } = require("commander");
const chalk = require("chalk");
const program = new Command();

const runCmd = (cmd) => {
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch (err) {
    console.error(chalk.red(`Error: ${err.message}`));
  }
};

program
  .name("vibe")
  .description("vibe-saver: effortlessly save your vibes")
  .version("1.0.0");

program
  .command("start")
  .description("Start your vibe coding")
  .action(() => runCmd("git init"));

program
  .command("clone <url>")
  .description("Grab vibes from the cloud")
  .action((url) => runCmd(`git clone ${url}`));

program
  .command("save <message>")
  .description("Save your current vibes")
  .action((msg) => runCmd(`git add . && git commit -m "${msg}"`));

program
  .command("push")
  .description("Sync your vibes to cloud")
  .action(() => runCmd("git push"));

program
  .command("pull")
  .description("Get latest vibes")
  .action(() => runCmd("git pull"));

program
  .command("rewind")
  .description("Undo last vibe save")
  .action(() => runCmd("git reset --soft HEAD~1"));

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
  .action((tag) => runCmd(`git tag ${tag} && git push --tags`));

program.parse(process.argv);
