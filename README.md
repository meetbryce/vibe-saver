# Vibe Saver

Save your code to GitHub and never worry about Cursor or Windsurf messing up your whole project! Vibe safely with vibe saver.

## Installation

```bash
npm install -g vibe-saver
```

## Usage

1. Create a GitHub account if you don't have one
2. Create a new repository on GitHub
3. Get a GitHub personal access token:

   - Go to GitHub Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
   - Generate new token
   - Select "repo" permissions
   - Copy the token

4. Initialize Vibe Saver in your project:

```bash
cd your-project
vibe init
```

Follow the prompts to enter your:

- GitHub username
- Personal access token
- Repository name

That's it! Vibe Saver will now automatically:

- Track changes to your code
- Create meaningful save points
- Upload your code to GitHub

## Shell Completion

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

## Commands

- `vibe init` - Set up Vibe Saver in your project
- `vibe status` - See what files have changed
- `vibe save "message"` - Manually create a save point with a message
- `vibe undo` - Undo last change
- `vibe sync` - Force upload to GitHub
- `vibe push` - Push changes to GitHub
- `vibe pull` - Get latest changes
- `vibe clone <url>` - Clone a repository
- `vibe history` - View save history
- `vibe publish <tag>` - Create a version tag

## Configuration

Settings are stored in `.vibe-saver/config.json`:

```json
{
  "github_token": "your-token",
  "github_username": "your-username",
  "repository": "your-repo",
  "auto_save": true,
  "save_interval": 300
}
```

- `auto_save`: Enable/disable automatic save points (default: true)
- `save_interval`: Seconds between auto-saves (default: 300)

## Need Help?

- Check out the [documentation](https://github.com/yourusername/vibe-saver/docs)
- Open an issue on [GitHub](https://github.com/yourusername/vibe-saver/issues)
