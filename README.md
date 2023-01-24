<p align="center">
  <a href="https://github.com/erdos-one/install">
    <img alt="install.erdos.one" src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/rocket_1f680.png" width="150"/>
  </a>
</p>

<h1 align="center">install.erdos.one — Installation made easy</h1>

Be gone the era of typing `https://raw.githubusercontent.com/...`

[install.erdos.one](https://github.com/erdos-one/install) is *not* a package manager. It's a simple
router, powered by [Cloudflare Workers](https://workers.cloudflare.com/), that redirects requests to
the install script of the open-source project you'd like to install. This project accompanies
[gh.erdos.one](https://github.com/erdos-one/gh), our GitHub raw content URL shortener, but allows
even shorter install commands for popular open-source projects. Uninstall scripts are also
supported, but are handled instead by [uninstall.erdos.one](https://github.com/erdos-one/uninstall).

The main impetus for this project's existence is frustration with overly verbose install commands.
Many developers write beautiful install scripts only to present their users with horrid, needlessly
verbose install commands. Let's make those install commands less daunting and improve our users'
experiences!

## Usage

### Install a project

Installs follow the pattern `SHELL_NAME <(curl https://install.erdos.one/PROJECT_NAME)`.

For example, to install [Homebrew](https://brew.sh/), run the following command:

```bash
bash <(curl https://install.erdos.one/brew)
```

If you'd prefer to use `wget` instead of `curl`, run the following command instead:

```bash
bash <(wget -qO- install.erdos.one/brew)
```

Compared to the official `brew` install command, ours saves 53 characters (it's 55% shorter)! As
importantly, it's much easier to read and understand.

### List all projects

To list all projects in the registry, run the following command:

```bash
curl https://install.erdos.one/ls
```

## Add a package to the registry

This project doesn't aim to replace existing package managers — if you're looking for a project that
accomplishes that, check out [tea](https://tea.xyz). Instead, it aims to provide simpler install
commands for open-source packages not available on package managers (like installing [Homebrew
](https://brew.sh/) itself or [Oh My Zsh](https://ohmyz.sh/)). Additionally, we allow for the
install of all the packages we produce through this project.

If there's a project you'd like to see added to the registry, please open an issue and if it's
within the scope of this project, we'll add it!

## How it works

A simple Cloudflare Worker powers this project. You can find the source code of the Worker [here
](src/index.ts).
