// Set the help message
const helpMessage: string = `Install open-source projects with ease

USAGE
  List available packages:
    install.erdos.one/ls

  Download a package (i.e. r2):
    sh <(curl install.erdos.one/r2)

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
    let packages: Packages = {}
    fetch(registryURL).then(response => {
      packages = response.json()
    })

    // Handle different path cases
    if (path === "ls") {
      // List package names if the path is "ls"
      let ls: string = ""
      Object.keys(packages).forEach(packageName => {
        ls += `${packageName} [${packages[packageName].shell} → ${packages[packageName].homepage}]\n`
      })
      return new Response(ls)
    } else if (path in packages) {
      // Fetch the install script from and return it
      return await fetch(packages[path].script)
    } else {
      // Return the help message to enable proper usage
      return new Response(helpMessage);
    }
  }
}
