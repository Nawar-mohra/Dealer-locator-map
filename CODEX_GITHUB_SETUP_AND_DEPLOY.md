# Codex, GitHub, and live demo setup

This guide covers opening this project in Codex, signing in to GitHub, and publishing changes to the live demo.

## Project links

- Project folder: `~/Documents/GitHub/Dealer-locator-map`
- GitHub repository: <https://github.com/Nawar-mohra/Dealer-locator-map>
- Live demo: <https://nawar-mohra.github.io/Dealer-locator-map/>
- Default branch: `main`

The repository is already connected to GitHub as the `origin` remote. The site is a static HTML/CSS/JavaScript project and does not need a build step.

## 1. Open the project in Codex

1. Open Codex.
2. Choose **Open project** (or open a folder) and select `~/Documents/GitHub/Dealer-locator-map`.
3. Start a task in that project and paste the prompt below when asking Codex to work on the design.

### Reusable design prompt

```text
Build the mobile view from this Figma prototype:
https://www.figma.com/proto/omvNZMWXzwE9YXljnpwIuh/W3-UI-Library?node-id=2998-20318&viewport=-193%2C-788%2C0.2&t=GmhrDEEpkG2tiH1D-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=48%3A19103&page-id=5%3A45257

First inspect the existing project structure and identify its framework, conventions, reusable components, design tokens, and assets. Then inspect the Figma prototype and use its screens as the visual reference.

Implement only the mobile experience. On desktop, show the mobile page inside a centered, phone-sized screen; do not stretch it into a desktop layout. Match the mobile design’s layout, spacing, typography, colors, assets, and interactions as closely as practical. If the prototype has no mobile screen, adapt the design to a phone-sized screen and preserve its key interactions.

Reuse existing components, styles, and assets where suitable. Keep changes limited to this project and avoid unrelated edits. After implementation, run the available checks and preview the page in a desktop browser to confirm the mobile layout. Fix issues you find and summarize the changes and how to view the result. If the Figma file cannot be accessed, explain what access or files are needed and continue with useful project inspection.
```

### Optional dealer-specific context

Use this as a follow-up when modifying dealer content or its map:

```text
Use the official Scania Alingsås dealer page as the source for dealer details:
https://www.scania.com/se/sv/home/admin/misc/dealer/dealer-details.html?dealer=c30fbd3c-ae99-4829-97ed-99a40985db55

The dealer is Börjessons Lastbilar AB, Borgens gata 11, 441 39 Alingsås. Use Scania’s map coordinates 57.935446, 12.572223. Keep the blue Scania truck pin; clicking it should open Google Maps directions in a new tab. Keep the page mobile-only, centered in a phone-sized canvas on desktop, and preserve the existing project structure and styles.
```

## 2. Install GitHub CLI on macOS

Check your Mac’s CPU architecture:

```bash
uname -m
```

For `arm64` (Apple silicon), install GitHub CLI with Homebrew if available:

```bash
brew install gh
```

If Homebrew is not installed, download the macOS **arm64** package/archive from the official GitHub CLI releases page: <https://github.com/cli/cli/releases/latest>. Choose the arm64 macOS asset (not amd64), then follow the package installer or the archive’s included installation instructions.

Confirm that the CLI is available:

```bash
gh --version
```

If you installed the CLI under `~/.local/bin` and `gh` is not found, add that directory to your zsh path once:

```bash
mkdir -p "$HOME/.local/bin"
echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.zshrc"
source "$HOME/.zshrc"
gh --version
```

## 3. Sign in to GitHub

Start the interactive sign-in:

```bash
gh auth login
```

Choose these options when prompted:

1. **GitHub.com**
2. **Login with a web browser**
3. **HTTPS** for Git operations
4. **Yes** to authenticate Git with your GitHub credentials

Press Enter to open the device login page. If it does not open, visit <https://github.com/login/device> yourself and enter the one-time code printed in Terminal. Only enter the code shown in your own Terminal session. Finish authorization in GitHub, then check the sign-in:

```bash
gh auth status
```

## 4. Push project changes to GitHub

In Terminal, move to the project folder:

```bash
cd ~/Documents/GitHub/Dealer-locator-map
```

Review and publish your changes:

```bash
git status
git add -A
git commit -m "Describe the changes"
git push origin main
```

Replace `Describe the changes` with a short message, for example `Update dealer contact details`. If Git says there is nothing to commit, there are no uncommitted file changes to push.

You can confirm the GitHub connection with:

```bash
git remote -v
git branch --show-current
```

The remote should be `https://github.com/Nawar-mohra/Dealer-locator-map.git` and the branch should be `main`.

## 5. Wait for the live demo deployment

Every push to `main` starts the GitHub Actions workflow at `.github/workflows/pages.yml`. It publishes the static project to GitHub Pages automatically.

Check deployment status in the repository’s **Actions** tab: <https://github.com/Nawar-mohra/Dealer-locator-map/actions>. When the Pages deployment completes, open or refresh:

<https://nawar-mohra.github.io/Dealer-locator-map/>

You can also check workflow status in Terminal (if GitHub CLI is installed and signed in):

```bash
gh run list --repo Nawar-mohra/Dealer-locator-map --limit 5
```

## 6. Preview locally

To run a local preview without deploying:

```bash
cd ~/Documents/GitHub/Dealer-locator-map
python3 -m http.server 4173
```

Open <http://localhost:4173> in a browser. Stop the local server with `Control+C` in Terminal. On desktop, the page is designed to stay inside a centered mobile canvas.
