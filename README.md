# Vibe Saver

Save your code to GitHub and never worry about losing your work. Vibe code safely with vibe saver. Includes all the features you need and none of the features you don't. It's git without all the complexity and overwhelm.

## Installation

```bash
npm install -g vibe-saver
```

Add autocomplete to help you easily find and use `vibe` commands:

```bash
vibe install
```

Then restart your shell by quitting and reopening the app you use to run `vibe` commands (usually Cursor or Windsurf).

## Usage

1. Navigate to your project directory
2. Initialize your project with Vibe Saver:

```bash
cd your-project
vibe start
```

3. Create your GitHub repository (where you'll backup your vibe saves) → [github.new](github.new)
4. Connect your folder to your GitHub repository using the repository link (looks like _github.com/username/project-name.git_)

```bash
vibe connect <github_link>
```

That's it! You can now use Vibe Saver commands to manage your project. Run `vibe help` if you forget which command to use.

## Commands

- `vibe save <message>` - Save your current vibes, use this every time you make a successful change
- `vibe start` - Set up the current folder for vibe-saver to manage (only needed once per project)
- `vibe connect <github_link>` - Connect your local folder to a GitHub repository
- `vibe clone <url>` - Grab code from the cloud (when you want to work on an existing project for the first time on a machine)
- `vibe sync` - Sync/push your vibes to the cloud (this uploads all your saves to github)
- `vibe pull` - Get latest vibes from the cloud (most useful when working on multiple machines)
- `vibe undo` - Undo last vibe save
- `vibe status` - Check your current vibe status
- `vibe history` - See your vibe history
- `vibe publish <tag>` - Publish a stable vibe version (use this to track major changes)

## Need Help?

- Run `vibe help` to see all available commands and options.
- `vibe help [command]` - Display help for a specific command
