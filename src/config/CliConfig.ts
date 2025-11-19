export interface CliCommand {
    name: string;
    description: string;
    aliases?: string[];
    execute: (args: string[], location: string, history: string[]) => CliCommandResult;
}

export type CliCommandResult = {
    output: string[];
    clear?: boolean;
    location?: string;
    themeChanged?: 'light' | 'dark' | 'solarized';
    fetch?: string;
};

export const commands: CliCommand[] = [
    // General commands
    {
        name: "help",
        description: "Show this help message",
        execute: () => {
            return {
                output: [
                    "Available commands:",
                    "====================================",
                    ...commands.map(cmd => {
                        let usage = cmd.name;
                        if (cmd.aliases && cmd.aliases.length > 0) usage += ` (aliases: ${cmd.aliases.join(", ")})`;
                        // Try to infer argument usage from description or name
                        if (cmd.name === "cd") usage += " <dir>";
                        if (cmd.name === "ls") usage += " [dir]";
                        if (cmd.name === "cat") usage += " <file>";
                        if (cmd.name === "echo") usage += " <text>";
                        if (cmd.name === "navigate") usage += " <page>";
                        if (cmd.name === "theme") usage += " <theme>";
                        if (cmd.name === "sudo") usage += " <cmd>";

                        return `${usage}: ${cmd.description}`;
                    })
                ]
            };
        }
    },
    {
        name: "clear",
        description: "Clear the terminal",
        execute: () => {
            return {output: [], clear: true};
        }
    },
    {
        name: "about",
        description: "Information about me",
        execute: () => {
            return {
                output: [
                    "Hello! I'm Hélder, a passionate self thought developer with experience in web development, open-source contributions, and more.",
                    "I have worked with various languages and frameworks which you can see in the skills tab."
                ]
            };
        }
    },
    {
        name: "theme",
        description: "Change the terminal theme",
        execute: (args: string[]) => {
            const theme: string = args[0];
            const availableThemes = ["light", "dark", "solarized"];

            if (availableThemes.includes(theme)) {
                return {
                    output: [`Theme changed to ${theme}.`],
                    themeChanged: theme as 'light' | 'dark' | 'solarized'
                }
            } else {
                return {
                    output: [`Invalid theme: ${theme}. Available themes are: ${availableThemes.join(", ")}.`]
                }
            }
        }
    },
    // Navigation commands
    {
        name: "cd",
        description: "Change directory",
        execute: (args, location) => {
            const dir = args[0];
            if (dir === "..") {
                if (location === availableLocations[0]) {
                    return {output: ["Already at root directory."]};
                } else {
                    return {output: [], location: availableLocations[0]};
                }
            }
            // Build target location
            let targetLocation = location === availableLocations[0] ? `${location}${dir}` : `${availableLocations[0]}/${dir}`;
            // Validate target location
            if (availableLocations.includes(targetLocation)) {
                return {output: [], location: targetLocation};
            } else {
                return {output: [`No such directory: ${dir}`]};
            }
        }
    },
    {
        name: "ls",
        description: "List files and directories",
        execute: (args, location) => {
            const folder = args[0] || "";
            if (!folder) {
                return {output: cliDirectory[location] || []};
            }
            // Build target location
            let targetLocation = location === availableLocations[0] ? `${location}${folder}` : `${availableLocations[0]}/${folder}`;
            if (availableLocations.includes(targetLocation)) {
                return {output: cliDirectory[targetLocation]};
            }
            return {output: [`ls: cannot access '${folder}': No such file or directory`]};
        }
    },
    {
        name: "tree",
        description: "Display directory structure",
        execute: (_args, location) => {
            const lines: string[] = [];
            const buildTree = (dir: string, prefix: string) => {
                const items = cliDirectory[dir];
                if (!items) return;
                items.forEach((item, index) => {
                    const isLast = index === items.length - 1;
                    const pointer = isLast ? "└── " : "├── ";
                    lines.push(`${prefix}${pointer}${item}`);
                    const subDir = `${dir}${item}/`;
                    if (availableLocations.includes(subDir)) {
                        buildTree(subDir, `${prefix}${isLast ? "    " : "│   "}`);
                    }
                });
            };
            buildTree(location, "");
            return {output: lines.length ? lines : [`tree: '${location}': No such file or directory`]};
        }
    },
    {
        name: "navigate",
        description: "Navigate to a page",
        execute: (_args, _location) => {
            // const page = args[0];
            // if (!page) {
            //     return {output: ["navigate: missing page argument"]};
            // }
            //
            // // Helper to recursively search navigationConfig
            // function findUrl(items: NavigationItem[], page: string): string | undefined {
            //     for (const item of items) {
            //         if (item.title.toLowerCase() === page.toLowerCase() && item.url) {
            //             return item.url;
            //         }
            //         if (item.children) {
            //             const childUrl = findUrl(item.children, page);
            //             if (childUrl) return childUrl;
            //         }
            //     }
            //     return undefined;
            // }
            //
            // const url = findUrl(navigationConfig, page);
            // if (url) {
            //     return {output: [`Navigating to ${page} (${url})`], location: url};
            // } else {
            //     return {output: [`navigate: page '${page}' not found`]};
            // }
            return {output: ["Navigation via terminal is disabled. Please use the web interface to navigate."]};
        }
    },
    {
        name: "pwd",
        description: "Print working directory",
        execute: (_args, location) => {
            return {output: [location]};
        }
    },
    // Unix-like commands
    {
        name: "echo",
        description: "Display a line of text",
        execute: (args) => {
            return {output: [args.join(" ")]};
        }
    },
    {
        name: "date",
        description: "Display the current date and time",
        execute: (_args, _location) => {
            return {output: [new Date().toString()]};
        }
    },
    {
        name: "uptime",
        description: "Show how long the system has been running",
        execute: (_args, _location) => {
            return {output: getUptimeInfo()};
        }
    },
    {
        name: "whoami",
        description: "Display the current user",
        execute: (_args, _location) => {
            return {output: [`Current user: Homepage}`]}
        }
    },
    {
        name: "exit",
        description: "Exit the terminal",
        aliases: ["quit", "logout"],
        execute: () => {
            return {output: ["Exiting terminal..."], location: "/"};
        }
    },
    {
        name: "cat",
        description: "Concatenate and display file contents",
        execute: (args, location, _history) => {
            const fileName = args[0];
            const dirContents = cliDirectory[location] || [];
            if (dirContents.includes(fileName)) {
                switch (location) {
                    case "cli/about":
                        switch (fileName) {
                            case "bio.txt":
                                return { output: [], fetch: "bio" };
                            case "skills.txt":
                                // TODO: Get skills form hook
                                return {output: ["Skills are currently only visible on the web Interface"]};
                            case "resume.pdf":
                                // TODO: Implement resume download link
                                return {output: ["Permission denied"]};
                            case "cv.pdf":
                                // TODO: Implement cv download link
                                return {output: ["Permission denied"]};
                            default:
                                return { output: [`cat: ${fileName}: No such file`] };
                        }
                    case "cli/projects":
                        return {output: ["Unsupported file type or content. Projects are only viewable via the web interface."]};
                    case "cli/contact":
                        return {output: ["Unsupported file type or content. Contact form is only viewable via the web interface."]};
                    case "cli/blog":
                        return {output: ["Unsupported file type or content. Blog posts are only viewable via the web interface."]};
                    default:
                        return {output: [`cat: ${fileName}: No such file`]}
                }
            }
            return { output: [`cat: ${fileName}: No such file`] };
        }
    },
    // Easter egg commands
    {
        name: "socials",
        description: "Display my social media links",
        execute: () => {
            return {
                output: [
                    "Find me on social media:"
                    // TODO: Add actual links
                ]
            }
        }
    },
    {
        name: "history",
        description: "Display command history",
        execute: (_args, _location, history) => {
            return {
                output: history.length ? history : ["No commands in history."]
            }
        }
    },
    // Secured commands
    {
        name: "sudo",
        description: "Execute a command with superuser privileges",
        execute: (args, location, _history) => {
            if (location === "cli/about" && args[0] === "cat" && (args[1] === "resume.pdf" || args[1] === "cv.pdf")) {
                return {
                    output: ["Permission denied: Unable to display PDF content in terminal. Please download the file via the web interface."]
                }
            }
            return {
                output: ["sudo: Permission denied: You are not allowed to execute this command."]
            }
        }
    }
]

// Directory structure for CLI
const cliDirectory: Record<string, string[]> = {
    "cli/": ["projects", "about", "contact", "blog", "other"],
    "cli/about": ["bio.txt", "skills.txt", "resume.pdf", "cv.pdf"],
    "cli/projects": ["Projects are only viewable via the web interface."],
    "cli/contact": ["contact.form"],
    "cli/blog": ["Blog posts are only viewable via the web interface."],
    "cli/other": ["" /*TODO: Implement*/],
};

// Get all available locations from cliDirectory
const availableLocations: string[] = Object.keys(cliDirectory);

// Helper functions
function getUptimeInfo() {
    // First visit (localStorage)
    let firstVisit = localStorage.getItem("cli_firstVisit");
    if (!firstVisit) {
        firstVisit = Date.now().toString();
        localStorage.setItem("cli_firstVisit", firstVisit);
    }
    // Session start (sessionStorage)
    let sessionStart = sessionStorage.getItem("cli_sessionStart");
    if (!sessionStart) {
        sessionStart = Date.now().toString();
        sessionStorage.setItem("cli_sessionStart", sessionStart);
    }
    const now = Date.now();
    const firstVisitMs = parseInt(firstVisit, 10);
    const sessionStartMs = parseInt(sessionStart, 10);

    // Helper to format ms to human-readable
    function formatDuration(ms: number) {
        const sec = Math.floor(ms / 1000) % 60;
        const min = Math.floor(ms / (1000 * 60)) % 60;
        const hr = Math.floor(ms / (1000 * 60 * 60)) % 24;
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        return `${days}d ${hr}h ${min}m ${sec}s`;
    }

    return [
        `First visit: ${new Date(firstVisitMs).toLocaleString()}`,
        `Time since first visit: ${formatDuration(now - firstVisitMs)}`,
        `Session started: ${new Date(sessionStartMs).toLocaleString()}`,
        `Session uptime: ${formatDuration(now - sessionStartMs)}`
    ];
}
