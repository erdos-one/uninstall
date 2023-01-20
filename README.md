# install.erdos.one

Be gone the era of typing `https://raw.githubusercontent.com/...`

[install.erdos.one](https://github.com/erdos-one/install) is *not* a package manager. It's a simple
router, powered by [Cloudflare Workers](https://workers.cloudflare.com/), that redirects requests to
the install script of the open source project you'd like to install. This project accompanies
[gh.erdos.one](https://github.com/erdos-one/gh), our GitHub raw content URL shortener, but allows
even shorter install commands for popular open source projects.

The main impetus for this project's existence is frustration with overly verbose install commands.
Many developers write beautiful install scripts only to present their users with horrid, needlessly
verbose install commands. Let's make those install commands less daunting and improve our users'
experiences!

## Usage

### Install a project

Installs follow the pattern:

```bash
SHELL_NAME <(curl https://install.erdos.one/PROJECT_NAME)
```

For example, to install [Homebrew](https://brew.sh/), run the following command:

```bash
bash <(curl https://install.erdos.one/brew)
```

Compared to the existing install command to install `brew`, ours saves 53 characters (it's 55% shorter)!

### List all projects

To list all projects in the registry, run the following command:

```bash
curl https://install.erdos.one/ls
```

## Add a package to the registry

This project doesn't aim to replace existing package managers — if you're looking for a project that
accomplishes that, check out [tea](https://tea.xyz). Instead, it aims to provide simpler install
commands for open source packages not available on package managers (like installing [Homebrew
](https://brew.sh/) or [Oh My Zsh](https://ohmyz.sh/)). Additionally, we allow install of all
packages we produce through this project.

If there's a project you'd like to see added to the registry, please open an issue and if it's
within the scope of this project, we'll add it!

## How it works

A simple Cloudflare worker powers this project. You can find the source code of the worker [here
](src/index.ts).
