// Set the help message
const helpMessage: string = `Install open-source projects with ease

USAGE
  List available packages:
    curl https://install.erdos.one/ls

  Download a package (i.e. r2):
    sh <(curl https://install.erdos.one/r2)

LEARN MORE
  Read the docs at https://oss.erdos.one/install

FEEDBACK
  Open an issue on GitHub: https://github.com/erdos-one/r2
`

// Type declaration for the packages registry
interface Packages {
  [key: string]: {
    homepage: string
    script: string
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
			// Fetch the install script from and return it
			let script = await fetch(packages[path].script)
			return script
		} else {
			// Return the help message to enable proper usage
			return new Response(helpMessage)
		}
	}
}
