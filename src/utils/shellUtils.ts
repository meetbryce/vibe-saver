import { exec, execSync } from "child_process";
import { platform } from "os";
import { promises as fs } from "fs";
import { join } from "path";
import { homedir } from "os";

export interface ShellInfo {
  name: string;
  configFile: string;
  completionDir?: string;
}

/**
 * Detects the current shell environment
 */
export function detectShell(): ShellInfo {
  const shell = process.env.SHELL || "";
  const home = homedir();

  // Extract shell name from path
  const shellName = shell.split("/").pop() || "";

  switch (shellName) {
    case "bash":
      return {
        name: "bash",
        configFile: join(home, ".bashrc"),
      };
    case "zsh":
      return {
        name: "zsh",
        configFile: join(home, ".zshrc"),
      };
    case "fish":
      return {
        name: "fish",
        configFile: join(home, ".config", "fish", "config.fish"),
        completionDir: join(home, ".config", "fish", "completions"),
      };
    default:
      // Default to bash if we can't detect
      return {
        name: "bash",
        configFile: join(home, ".bashrc"),
      };
  }
}

/**
 * Installs shell completion for the given shell
 */
export async function installShellCompletion(
  completionScript: string,
  shell: ShellInfo
): Promise<{ success: boolean; message: string }> {
  try {
    // For fish, write to completions directory
    if (shell.name === "fish" && shell.completionDir) {
      try {
        await fs.mkdir(shell.completionDir, { recursive: true });
        await fs.writeFile(
          join(shell.completionDir, "vibe.fish"),
          completionScript
        );
        return {
          success: true,
          message: `Fish completions installed to ${join(
            shell.completionDir,
            "vibe.fish"
          )}`,
        };
      } catch (err) {
        return {
          success: false,
          message: `Failed to write fish completions: ${err}`,
        };
      }
    }

    // For bash/zsh, append to config file if not already there
    const configContent = await fs
      .readFile(shell.configFile, "utf8")
      .catch(() => "");

    // Check if completion is already installed
    if (configContent.includes("# vibe completion")) {
      return {
        success: true,
        message: `Completions already installed in ${shell.configFile}`,
      };
    }

    // Add completion to config file
    const completionLine = `\n# vibe completion\n${
      shell.name === "bash" || shell.name === "zsh"
        ? `eval "$(vibe completion ${shell.name})"\n`
        : completionScript
    }`;

    await fs.appendFile(shell.configFile, completionLine);

    return {
      success: true,
      message: `Added completion to ${shell.configFile}`,
    };
  } catch (err) {
    return {
      success: false,
      message: `Failed to install completions: ${
        err instanceof Error ? err.message : String(err)
      }`,
    };
  }
}
