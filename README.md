# Vibe Saver

Save your code to GitHub and never worry about losing your work. Vibe safely with vibe saver.

## Installation

```bash
npm install -g vibe-saver
```

### Shell Completion

Enable tab completion for vibe commands in your shell:

```bash
# For bash users (add to ~/.bashrc):
vibe completion bash >> ~/.bashrc

# For zsh users (add to ~/.zshrc):
vibe completion zsh >> ~/.zshrc

# For fish users:
vibe completion fish > ~/.config/fish/completions/vibe.fish
```

Then restart your shell or run `source ~/.bashrc` (or `~/.zshrc` for zsh).

## Usage

1. Navigate to your project directory
2. Initialize your project with Vibe Saver:

```bash
cd your-project
vibe start
```

That's it! You can now use Vibe Saver commands to manage your project. Run `vibe help` if you forget which command to use.

## Commands

- `vibe start` - Setup the current folder for vibe-saver to manage
- `vibe clone <url>` - Grab vibes from the cloud
- `vibe save <message>` - Save your current vibes
- `vibe push` - Sync your vibes to the cloud
- `vibe pull` - Get latest vibes from the cloud
- `vibe undo` - Undo last vibe save
- `vibe status` - Check your current vibe status
- `vibe history` - See your vibe history
- `vibe publish <tag>` - Publish a stable vibe version
- `vibe help [command]` - Display help for a specific command

## Need Help?

Run `vibe help` to see all available commands and options.
