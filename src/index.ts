// Set the help message
const helpMessage: string = `Uninstall open-source projects with ease

USAGE
  List available projects:
    curl https://uninstall.erdos.one/ls

		OR, using wget:
		wget -qO- https://uninstall.erdos.one/ls

  Uninstall a project (i.e. Oh My Zsh):
    sh <(curl https://uninstall.erdos.one/ohmyzsh)

LEARN MORE
  Read the docs at https://oss.erdos.one/uninstall

FEEDBACK
  Open an issue on GitHub: https://github.com/erdos-one/uninstall
`

// Type declaration for the packages registry
interface Packages {
  [key: string]: {
    homepage: string
    install: string
    uninstall: string
    shell: string
  }
}

// Handle requests to the Cloudflare worker
export default {
  async fetch(request: Request) {
    // Get the path from the request URL and strip any leading and trailing slashes
    const url: URL = new URL(request.url)
    const path: string = url.pathname.replace(/^\/+|\/+$/g, "")

    // Get the packages registry
    const registryURL: string = "https://raw.githubusercontent.com/erdos-one/install/main/registry.json"
    const resp = await fetch(registryURL)
		const packages: Packages = await resp.json()

		// Handle different path cases
		if (path === "ls") {
			// List package names if the path is "ls"
			let ls: string = ""

			// Keep track of the longest name and shell to align the output
			let longestName: number = 0
			let longestShell: number = 0
			Object.keys(packages).forEach(name => {
				if (name.length > longestName) {
					longestName = name.length
				}
				if (packages[name].shell.length > longestShell) {
					longestShell = packages[name].shell.length
				}
			})

			// Generate the output
			Object.keys(packages).forEach(name => {
				const space1: string = "  " + " ".repeat(longestName - name.length)
				const space2: string = "  " + " ".repeat(longestShell - packages[name].shell.length)
				ls += `${name}${space1}[${packages[name].shell}]${space2}${packages[name].homepage}\n`
			})

			return new Response(ls)
		} else if (path in packages) {
			// Fetch the uninstall script from https://github.com/erdos-one/install and return it
			let uninstallScript = await fetch(packages[path].uninstall)
			return uninstallScript
		} else {
			// Return the help message to enable proper usage
			return new Response(helpMessage)
		}
	}
}
