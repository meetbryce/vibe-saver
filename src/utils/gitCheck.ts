import { exec } from "child_process";
import { platform } from "os";

export interface GitInstallInfo {
  isInstalled: boolean;
  installCommand?: string;
}

export async function checkGitInstallation(): Promise<GitInstallInfo> {
  return new Promise((resolve) => {
    exec("git --version", (error) => {
      if (!error) {
        resolve({ isInstalled: true });
        return;
      }

      const os = platform();
      let installCommand = "";

      switch (os) {
        case "darwin":
          installCommand = "brew install git";
          break;
        case "win32":
          installCommand = "winget install --id Git.Git -e --source winget";
          break;
        case "linux":
          // Most common Linux package managers
          installCommand =
            "sudo apt-get install git || sudo yum install git || sudo dnf install git";
          break;
        default:
          installCommand = "Please visit https://git-scm.com/downloads";
      }

      resolve({ isInstalled: false, installCommand });
    });
  });
}
