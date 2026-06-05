# Version Control Systems — A Complete Visual Guide

*From the three states of Git to branching strategies used by Netflix and Google — a clear, complete guide to how modern software teams track, share, and collaborate on code.*

```
  /$$$$$$                                  /$$                     /$$       /$$$$$$$           
 /$$__  $$                                | $$                    | $$      | $$__  $$          
| $$  \__/  /$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$    /$$$$$$   /$$$$$$$      | $$  \ $$ /$$   /$$
| $$       /$$__  $$ /$$__  $$ |____  $$|_  $$_/   /$$__  $$ /$$__  $$      | $$$$$$$ | $$  | $$
| $$      | $$  \__/| $$$$$$$$  /$$$$$$$  | $$    | $$$$$$$$| $$  | $$      | $$__  $$| $$  | $$
| $$    $$| $$      | $$_____/ /$$__  $$  | $$ /$$| $$_____/| $$  | $$      | $$  \ $$| $$  | $$
|  $$$$$$/| $$      |  $$$$$$$|  $$$$$$$  |  $$$$/|  $$$$$$$|  $$$$$$$      | $$$$$$$/|  $$$$$$$
 \______/ |__/       \_______/ \_______/   \___/   \_______/ \_______/      |_______/  \____  $$
                                                                                       /$$  | $$
                                                                                      |  $$$$$$/
                                                                                       \______/ 
 /$$      /$$                     /$$ /$$           /$$                                         
| $$$    /$$$                    | $$|__/          |__/                                         
| $$$$  /$$$$ /$$   /$$  /$$$$$$ | $$ /$$  /$$$$$$$ /$$                                         
| $$ $$/$$ $$|  $$ /$$/ /$$__  $$| $$| $$ /$$_____/| $$                                         
| $$  $$$| $$ \  $$$$/ | $$  \ $$| $$| $$|  $$$$$$ | $$                                         
| $$\  $ | $$  >$$  $$ | $$  | $$| $$| $$ \____  $$| $$                                         
| $$ \/  | $$ /$$/\  $$|  $$$$$$/| $$| $$ /$$$$$$$/| $$                                         
|__/     |__/|__/  \__/ \______/ |__/|__/|_______/ |__/ 
```

---

## Contents

- [01 Centralized vs distributed VCS](#01-centralized-vs-distributed-vcs)
- [02 The three states of Git](#02-the-three-states-of-git)
- [03 Branching and merging](#03-branching-and-merging)
- [04 Git vs GitHub — not the same thing](#04-git-vs-github--not-the-same-thing)
- [05 Git’s data model — snapshots, not deltas](#05-gits-data-model--snapshots-not-deltas)
- [06 SHA‑1 hashes — cryptographic integrity](#06-sha1-hashes--cryptographic-integrity)
- [07 Merge strategies — how Git stitches histories together](#07-merge-strategies--how-git-stitches-histories-together)
- [08 Remote repositories — sharing code over the internet](#08-remote-repositories--sharing-code-over-the-internet)
- [09 GitHub features — beyond a code storage folder](#09-github-features--beyond-a-code-storage-folder)
- [10 Branching strategies — team rules for using Git](#10-branching-strategies--team-rules-for-using-git)
- [Quick‑reference glossary](#quickreference-glossary)

---

## 01 Centralized vs distributed VCS

Before modern tools like Git, teams used Centralized Version Control Systems (CVCS). The world has since shifted almost entirely to Distributed systems (DVCS) — understanding why explains Git’s core design.

| Centralized (old way) – e.g. SVN, Perforce | Distributed (Git way) – Git, Mercurial |
|--------------------------------------------|----------------------------------------|
| One single master copy of the code history lives on a central server. Every developer must connect to it to commit, view history, or collaborate. | Every developer who clones the project gets a 100% complete copy of the entire project history on their local machine. |
|  Single point of failure — if the server goes down, no one can save work or access history | No internet needed to commit, view history, or revert |
|  Requires a network connection for almost every operation | Server failure is recoverable — any developer’s copy can restore everything |

> **Key insight**  
> In a distributed system, there’s no “master” — just many equal copies. The server on GitHub is just another copy that the team has agreed to treat as the official source of truth.

---

## 02 The three states of Git

The biggest hurdle for Git beginners: code doesn’t jump straight into history when you save a file. Git tracks files across three distinct local zones before they ever touch the internet.

| Working directory | Staging area | Local repository |
|------------------|--------------|------------------|
| *Modified* – Your actual folder. You’re actively editing. Git sees the changes but hasn’t tracked them. | *Staged* – A sandbox where you curate the next snapshot. You choose exactly which changes to include. | *Committed* – Permanently saved as a cryptographic snapshot in your `.git` directory. |
| `git add` → | `git commit` → | (saved permanently) |

> **Photography studio analogy**  
> - **Working directory** — people are walking around, changing clothes, getting into position.  
> - **Staging area** — you say “everyone freeze, smile!” You’ve framed the perfect shot.  
> - **Local repository** — you click the shutter. The photo is saved permanently to the memory card.

**The essential three commands**
```bash
# 1. Start tracking a project folder
git init

# 2. Move files from Working Directory → Staging Area
git add index.html

# 3. Take the snapshot, save it to Local Repository
git commit -m "Fix the login page layout bug"
```

---

## 03 Branching and merging

In the old days, two developers editing the same file at the same time would overwrite each other’s work. Git solves this with branching — letting each developer work in an isolated parallel universe.

- **Branch** – A lightweight pointer to a specific commit. Lets you diverge from `main` to build a feature or fix a bug in complete isolation, without touching live code.
- **Merge** – Once a feature is complete and tested, the isolated branch is merged back into `main`, combining both histories into one.
- **Merge conflict** – If two developers changed the exact same line of the same file on different branches, Git halts and forces a human to review and choose the correct version.

**What a merge conflict looks like in your file**
```
<<<<<<< HEAD
console.log("Hello from Main Branch!");
=======
console.log("Hello from my Feature Branch!");
>>>>>>> feature-branch
```
You must delete the markers, choose (or combine) the two versions, save the file, and make a fresh commit to complete the merge.

---

## 04 Git vs GitHub — not the same thing

A classic exam mistake: treating Git and GitHub as interchangeable. They are entirely distinct tools that happen to work together.

| Git | GitHub |
|-----|--------|
| The local tool – open‑source software that runs in your computer’s terminal. Tracks files, manages history, handles branches. Works completely offline — no internet or account required. | The cloud platform – a website (owned by Microsoft) that hosts Git repositories in the cloud. Adds collaboration tools: pull requests, code review, issue tracking, CI/CD. |
| *Runs on: your machine* | *Runs on: github.com servers* |

> **The relationship**  
> You use Git to manage your code locally. You use GitHub to share that code with the world. Git would work fine without GitHub. GitHub would be useless without Git.

---

## 05 Git’s data model — snapshots, not deltas

Git’s speed and flexibility come from one fundamental design decision: it stores data as snapshots, not differences.

| Delta‑based (SVN) | Snapshot‑based (Git) |
|-------------------|----------------------|
| Stores the original file, then a list of additions and deletions for each version. To see version 5, the system must stitch together the original plus all 5 sets of changes dynamically — slow for large histories. | Every commit takes a picture of all files at that exact moment. If a file hasn’t changed, Git doesn’t duplicate it — it stores a lightweight link to the identical previous version. |

> **Analogy**  
> Delta‑based systems are like keeping a running list of edits on a Google Doc. Git is like taking a full photograph of your entire project folder every time you hit save — but a smart camera that reuses identical parts automatically.

**Branches are just pointers — that’s why they’re instant**  
In older systems, creating a branch meant copying the entire project folder. A 2 GB project = 2 GB per new branch, taking minutes. In Git, a branch is a 41‑byte text file containing one SHA‑1 hash. Creating a branch is instantaneous regardless of project size.

- **HEAD** – A special pointer that tells Git which branch your working directory is currently “sitting on.” When you switch branches, HEAD moves.
- **Branch pointer** – A file containing one SHA‑1 hash. When you commit, the branch pointer automatically moves forward to the new commit. No files are ever duplicated.

---

## 06 SHA‑1 hashes — cryptographic integrity

In Git, it is physically impossible to secretly alter a file or silently lose data. Every piece of content is identified by a cryptographic fingerprint called a SHA‑1 hash.

1. **Git hashes everything on commit** – When you commit, Git runs all file contents, the folder structure, the author’s name, and the timestamp through a mathematical formula (SHA‑1).
2. **The output is a unique 40‑character string** – Example: `24b9da6552252987aa493b52f8696cd6d3b00373`
3. **Any change — even one character — produces a completely different hash** – Git doesn’t identify files by name; it identifies them by hash. A file named `index.html` with a comma changed is, to Git, a completely different object.

> **Why this matters**  
> You can’t rewrite history secretly. You can’t corrupt a file without Git detecting it. The entire project history is cryptographically tamper‑evident — every commit knows the hash of its parent, forming an unbreakable chain.

---

## 07 Merge strategies — how Git stitches histories together

When you run `git merge`, Git picks one of two strategies depending on how the two branches evolved relative to each other.

| Fast‑forward merge | 3‑way merge |
|--------------------|-------------|
| *The straight line* – Occurs when `main` has had zero new commits since you branched off. History is a clean straight line, so Git simply slides the `main` pointer forward to your branch’s latest commit. No new commit is created. | *The diverged path* – Occurs when `main` received new commits while you were on your branch — timelines have diverged. Git compares three snapshots (common ancestor, main, your branch) and auto‑combines them into a new Merge Commit. |
| Clean, linear history — easy to read | Preserves full history of both branches |
| No extra merge commit cluttering the log | Creates an extra merge commit; history is non‑linear |

> **Analogy — fast‑forward**  
> You and a friend are reading the same book. You paused at Chapter 5; your friend kept reading to Chapter 10. To catch up, you don’t need to combine notes — you just flip your pages forward.

**The 3‑way merge: what Git actually looks at**
- **Commit A** – The latest commit on `main`. Contains the hotfix your teammate merged while you were working.
- **Commit B** – The latest commit on your feature branch. Contains your new work.
- **Common ancestor** – The exact commit where your branch originally split off from `main`. Git uses this as the baseline for all comparisons.

> **How auto‑merge works**  
> If a file changed in your branch but not in `main` since the split, Git takes your version. If it changed in `main` but not yours, Git takes main’s version. If it changed in **both** — conflict. Git halts and demands a human decision.

---

## 08 Remote repositories — sharing code over the internet

When you push your local branches to GitHub, you’re synchronizing two independent database instances over the internet. Here’s how Git manages that connection.

- **`origin`** – The default nickname Git gives to your main cloud repository. It’s just an alias for a URL like `https://github.com/user/repo.git`.
- **Remote tracking branches** – Read‑only local mirrors of what the cloud looks like. They appear as `origin/main`, `origin/feature-x`. They only update when you run a network command.

### The 4 essential network commands

1. **`git clone <url>` — the first copy**  
   Downloads an entire repository from the cloud to your local machine. Automatically sets up the `origin` remote nickname and downloads all past history, tags, and branches. Used once per project.

2. **`git push <remote> <branch>` — sending data up**  
   Uploads your local commits to the remote repository. Example: `git push origin feature-login` packages your snapshots, uploads them to GitHub, and moves both the cloud’s branch pointer and your local `origin/feature-login` tracking branch forward.

3. **`git fetch <remote>` — checking for updates**  
   Talks to the cloud and downloads any changes teammates have made — without touching your active working files. Updates your local `origin/*` tracking branches so you can see what’s new before combining anything. Like downloading a newspaper without reading it at your desk yet.

4. **`git pull <remote> <branch>` — download and combine**  
   A two‑in‑one shortcut: runs `git fetch` to download cloud data, then immediately runs `git merge` to fuse those remote changes into your active local branch. Convenient but less controlled than fetch + merge separately.

### Pull requests and code review

Once your branch is on GitHub via `git push`, you don’t merge it directly into production. Teams use a gatekeeping workflow called a **Pull Request (PR)**.

1. **Open the PR** – A formal message to your team: “I finished the login feature. Please review it before we merge.” GitHub shows a visual diff of every added, changed, or deleted line.
2. **Code review** – Teammates comment on specific lines, ask questions, and request changes. The author pushes fixes; the PR updates live.
3. **Automated testing (CI/CD)** – Cloud servers run your code through automated tests to verify nothing is broken before it’s allowed to merge.
4. **Merge** – Once a senior dev approves and all tests pass, someone clicks “Merge.” GitHub handles the 3‑way merge in the cloud, closing the feature branch.

---

## 09 GitHub features — beyond a code storage folder

GitHub adds collaboration, automation, and project management on top of Git. Here are the features that matter most for working in a real team.

### Forking vs cloning — open‑source contribution

| `git clone` | Fork on GitHub |
|-------------|----------------|
| *Local copy* – Downloads the repo to your machine. If you don’t have write permission from the owner, you can’t push changes back. Your edits stay local. | *Cloud copy under your name* – Creates a copy of someone else’s repo inside your own GitHub account. You have full write access to your fork. Then open a PR back to the original project to propose your changes. |

> **Analogy**  
> A famous chef publishes a cookbook. **Cloning** is buying a copy — you can write in the margins, but the chef never sees it. **Forking** is photocopying the book under your own name, improving a recipe, and sending the chef a letter saying “I made this 10% better — want to add it to the next edition?”

> **The fork workflow**  
> Fork the original repo to your account → Clone your fork to your machine → Make changes and push to your fork → Open a Pull Request from your fork to the original project.

### GitHub Actions — the automation engine (CI/CD)

GitHub Actions lets you write scripts that run automatically whenever a specific event happens — like opening a PR or merging to main. GitHub spins up a temporary cloud server, downloads your code, and runs your commands.

- **Linting** – Automatically check code for syntax errors, style violations, and typos on every PR.
- **Security tests** – Run thousands of tests to ensure no passwords or secrets were accidentally committed.
- **Auto‑deploy** – Automatically push approved code to your host (AWS, Azure, Vercel) the moment a PR is merged.

### Issues, Projects, and the developer profile

| Feature | What it does |
|---------|---------------|
| **Issues** | Built‑in ticket system. Anyone can report bugs, request features, or ask questions. Developers assign them to team members and reference them in commits. |
| **Projects** | Kanban board with columns like “To Do”, “In Progress”, “Done”. Links issues and PRs visually so teams can track a release at a glance. |
| **Contribution graph** | The famous green‑square grid on every profile. Every commit, PR, and review turns a square green — the darker the green, the more active the developer. Acts as a transparent, public portfolio for recruiters. |
| **Stars & forks** | Like “likes” and “retweets” for repositories. 10,000 stars = the developer community considers this project highly valuable. |

---

## 10 Branching strategies — team rules for using Git

When multiple developers push to the same repo, chaos ensues without agreed rules. A branching strategy defines when branches are created, how they’re named, and when they’re allowed to merge. The two dominant strategies reflect very different philosophies about speed vs safety.

| GitFlow (traditionalist) | Trunk‑based development (modern speedster) |
|--------------------------|---------------------------------------------|
| Rigid, structured model for software with scheduled release cycles (desktop apps, enterprise software updating every few months). Multiple long‑lived branches with strict roles. | Industry standard at Netflix, Facebook, and Google. Everyone works from a single central branch. Tiny short‑lived branches merge back within hours or days. |
| Extremely safe — code passes multiple review layers before reaching users | Fast, low conflict risk — small changes mean small merges |
| Slow and complex — features sit isolated for weeks, causing “Merge Hell” | Requires strong automated test coverage to catch regressions |

### GitFlow branch hierarchy

| Branch | Lifespan | Purpose |
|--------|----------|---------|
| `main` | Permanent | The sacred branch. Only ever contains code that is live in production and in customers’ hands. |
| `develop` | Permanent | Integration branch. Finished features gather here for joint testing before being promoted to main. |
| `feature/*` | Short‑lived | One branch per feature, forked from develop. Merged back into develop when complete. |
| `release/*` | Short‑lived | Prep branch for the next big version — final bug fixes only, no new features. |
| `hotfix/*` | Short‑lived | Emergency fix for a live bug. Forked directly from main, merged back into both main and develop immediately. |

### Feature flags — trunk‑based development’s secret weapon

> **Problem** – How do you merge half‑finished features into the live production branch without breaking the app for users?

> **Solution: Feature flags**  
> A conditional toggle switch in the code. The unfinished feature is deployed to the live server, but a flag hides it from users. When the backend team flips the flag to ON, the feature instantly becomes visible — no new deployment needed.

### Comparison at a glance

| Metric | GitFlow | Trunk‑based |
|--------|---------|--------------|
| Branch lifespan | Weeks or months | Hours or days |
| Merge frequency | Infrequent, large batches | Multiple times per day |
| Best for | Scheduled releases, strict QA gates | SaaS, web apps, CI/CD pipelines |
| Conflict risk | High — “Merge Hell” | Low — small increments |
| Used by | Enterprise software, game studios | Netflix, Google, Facebook |

---

## Quick‑reference glossary

| Term | Definition |
|------|------------|
| **VCS** | Version Control System — software that tracks changes to code over time. |
| **DVCS** | Distributed VCS — every developer holds the full history locally. No single point of failure. |
| **Working directory** | Your actual folder. Files you’re actively editing. Git sees changes but hasn’t tracked them yet. |
| **Staging area** | A sandbox for curating your next commit. You choose which of your changes to include. |
| **`git add`** | Moves files from the working directory into the staging area. |
| **`git commit`** | Takes a permanent cryptographic snapshot of everything in the staging area. |
| **SHA‑1 hash** | A unique 40‑character fingerprint for every commit and file. Changing one character changes the hash entirely. |
| **HEAD** | A pointer to the branch you’re currently working on. Moves forward with every commit. |
| **Branch** | A lightweight 41‑byte pointer file. Creating one is instantaneous — no files are copied. |
| **Merge commit** | A special commit with two parent commits, created by a 3‑way merge to tie two histories together. |
| **Merge conflict** | Occurs when two branches change the same line of the same file. Requires a human to resolve. |
| **`origin`** | The default alias Git assigns to your remote cloud repository’s URL. |
| **`git clone`** | Downloads a full repo from the cloud, including all history, branches, and tags. |
| **`git push`** | Uploads your local commits to the remote repo and advances the remote branch pointer. |
| **`git fetch`** | Downloads remote changes into local tracking branches without touching your working files. |
| **`git pull`** | Shortcut for `git fetch` + `git merge`. Downloads remote changes and merges them into your active branch. |
| **Pull request (PR)** | A formal proposal on GitHub to merge a branch. Triggers code review, discussion, and automated tests. |
| **Fork** | A cloud copy of someone else’s repo under your own GitHub account. The basis of open‑source contribution. |
| **GitHub Actions** | CI/CD automation — scripts triggered by GitHub events that run on temporary cloud servers. |
| **GitFlow** | Branching strategy using long‑lived main/develop/feature/release/hotfix branches for scheduled releases. |
| **Trunk‑based dev** | Everyone merges tiny branches to a single trunk multiple times per day. Used by Netflix, Google. |
| **Feature flag** | A code toggle that hides unfinished features from users while they live on the production server. |
| **Merge Hell** | Colloquial term for the catastrophic conflicts that arise when long‑isolated GitFlow branches are finally merged. |

---

*End of guide. For an interactive experience with a click‑through remote command stepper, please open the `index.html` file in a modern browser.*