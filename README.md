<p align="center">
  <a href="https://github.com/erdos-one/uninstall">
    <img alt="uninstall.erdos.one" src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/wastebasket_1f5d1-fe0f.png" width="150"/>
  </a>
</p>

<h1 align="center">
  uninstall.erdos.one — Uninstallation made easy
  </h1>

`uninstall.erdos.one` is the companion to `install.erdos.one`. To read more about that project,
visit [its repo](https://github.com/erdos-one/install).

## Usage

### Uninstall a project

Uninstalls follow the pattern: `SHELL_NAME <(curl https://uninstall.erdos.one/PROJECT_NAME)`.

For example, to uninstall [Homebrew](https://brew.sh/), run the following command:

```bash
bash <(curl https://uninstall.erdos.one/brew)
```

If you'd prefer to use `wget` instead of `curl`, run the following command instead:

```bash
bash <(wget -qO- uninstall.erdos.one/brew)
```

Compared to the official `brew` uninstall command, ours saves 52 characters (it's 54% shorter)! As
importantly, it's much easier to read and understand.

### List all projects

To list all projects in the registry, run the following command:

```bash
curl https://uninstall.erdos.one/ls
```

## Add a project to the registry

The project registry that supports `uninstall.erdos.one` can be found
[in the install.erdos.one repo](https://github.com/erdos-one/install/blob/main/registry.json). See
that repo's README for more information on
[how to add a project to the registry](https://github.com/erdos-one/install#add-a-project-to-the-registry).

## How it works

A simple Cloudflare worker powers this project. You can find the source code of the worker [here
](src/index.ts).
