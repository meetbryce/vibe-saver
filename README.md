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

- `vibe save <message>` - Save your current vibes (git add + commit)
- `vibe start` - Set up current folder for vibe-saver (git init)
- `vibe connect <repository_link>` - Connect to GitHub repository (git remote add)
- `vibe clone <url>` - Grab code from GitHub (git clone)
- `vibe sync` - Push your vibes to GitHub (git push)
- `vibe pull` - Get latest vibes from GitHub (git pull)
- `vibe undo` - Undo last vibe save (git reset --hard HEAD~1)
- `vibe clear` - Clean up all changes since your last vibe save (git reset --hard HEAD)
- `vibe status` - Check your current vibe status (git status)
- `vibe history` - See your vibe history (git log)
- `vibe publish <tag>` - Publish a stable vibe version (git tag)
- `vibe install` - One-time setup to enable vibe-saver autocomplete in your terminal

## Cursor Integration

Vibe Saver works perfectly with Cursor editor! Use Cursor's Rules for AI feature to enhance your workflow:

### Global Rules for Vibe Saver (Recommended)

For the best experience with Vibe Saver across all your projects:

1. Go to Cursor Settings → General → Rules for AI
2. Add the following rule to the global rules section:

```
# Vibe Saver Rules

Vibe Saver is a simplified git wrapper that makes version control easy with commands prefixed with "vibe".

When I mention vibe commands, understand these are git operations with the following mappings:
- `vibe save <message>` = Saves current changes (similar to git add + git commit)
- `vibe start` = Sets up current folder for vibe-saver (similar to git init)
- `vibe connect <github_link>` = Connects to GitHub repository (similar to git remote add)
- `vibe clone <url>` = Grabs code from GitHub (similar to git clone)
- `vibe sync` = Pushes changes to GitHub (similar to git push)
- `vibe pull` = Gets latest changes from GitHub (similar to git pull)
- `vibe undo` = Reverts last save and all unsaved changes (similar to git reset --hard HEAD~1)
- `vibe clear` = Cleans up all changes since last save (similar to git reset --hard HEAD)
- `vibe status` = Shows current state (similar to git status)
- `vibe history` = Shows commit history (similar to git log --oneline --decorate)
- `vibe publish <tag>` = Publishes a stable version (similar to git tag + git push --tags)
- `vibe install` = Sets up shell completions for vibe commands

When I ask for help with any Vibe Saver command, suggest the appropriate command syntax and usage examples.

For common coding workflows, suggest appropriate vibe commands:
- After completing a feature: `vibe save "Add feature X"`
- Before ending work session: `vibe sync`
- When starting work: `vibe pull`
- When unsure of current state: `vibe status`

Help me create good save messages that are concise and descriptive.
```

With this global rule, Cursor's AI will understand Vibe Saver commands across all your projects without having to create project-specific rules each time.

### Alternative: Project-Specific Rules

If you prefer to set up rules for specific projects only:

1. Create a new project rule by pressing `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux) and selecting "New Cursor Rule"
2. Save the rule file in the `.cursor/rules` directory with a name like `vibe-saver-rules.md`
3. Use the same rule content as above with a pattern of `**/*` to apply to all files

### Terminal Commands in Cursor

You can run Vibe Saver commands directly in Cursor's integrated terminal:

1. Open the terminal with `` Ctrl+` `` (Windows/Linux) or `` Cmd+` `` (macOS)
2. Run any vibe command like `vibe status` or `vibe save "My changes"`

With these rules in place, Cursor's AI features will understand Vibe Saver commands and provide appropriate suggestions and help when working with your version-controlled code.

## Need Help?

- Run `vibe help` to see all available commands and options.
- `vibe help [command]` - Display help for a specific command

## Website

Visit our [website](https://bryceyork.github.io/vibe-saver/) for more information and documentation.
