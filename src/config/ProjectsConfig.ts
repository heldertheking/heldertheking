export class ProjectCategory {
    static PROFESSIONAL = "PROFESSIONAL";
    static PERSONAL = "PERSONAL";
    static HOMELAB = "HOMELAB";
    static GAMING = "GAMING";
    static MEDIA = "MEDIA";
    static WEB = "WEB";

    static getCategories(): string[] {
        return [
            ProjectCategory.PROFESSIONAL,
            ProjectCategory.PERSONAL,
            ProjectCategory.HOMELAB,
            ProjectCategory.GAMING,
            ProjectCategory.MEDIA,
            ProjectCategory.WEB
        ];
    }
}

export interface ProjectItem {
    title: string;
    description: string;
    url: string;
    categories: string[];
}

export interface ProjectsConfig {
    projects: ProjectItem[];
}

const projectsConfig: ProjectsConfig = {
    projects: [
        {
            title: "Personal Portfolio Website",
            description: "A personal portfolio website to showcase my projects and skills.",
            url: "https://heldertheking.com",
            categories: [ProjectCategory.PERSONAL, ProjectCategory.WEB],
        },
        {
            title: "Media Server",
            description: "A media server setup to stream my media collection.",
            url: "https://media.heldertheking.com/jellyfin",
            categories: [ProjectCategory.PERSONAL, ProjectCategory.HOMELAB, ProjectCategory.MEDIA],
        },
        {
            title: "Game Server Infrastructure",
            description: "A game server infrastructure to host multiple game servers.",
            url: "https://panel.heldertheking.com",
            categories: [ProjectCategory.PERSONAL, ProjectCategory.HOMELAB, ProjectCategory.GAMING, ProjectCategory.WEB],
        },
        {
            title: "Homelab Dashboard",
            description: "A homelab dashboard to monitor my homelab services and resources.",
            url: "https://lab-dash.heldertheking.com",
            categories: [ProjectCategory.PERSONAL, ProjectCategory.HOMELAB, ProjectCategory.WEB],
        // },
        // {
        //     title: "Tittle",
        //     description: "A really good description",
        //     url: "https://example.com",
        //     categories: [],
        // },
        // {
        //     title: "Tittle",
        //     description: "A really good description",
        //     url: "https://example.com",
        //     categories: [],
        // },
        // {
        //     title: "Tittle",
        //     description: "A really good description",
        //     url: "https://example.com",
        //     categories: [],
        // },
        // {
        //     title: "Tittle",
        //     description: "A really good description",
        //     url: "https://example.com",
        //     categories: [],
        // },
        // {
        //     title: "Tittle",
        //     description: "A really good description",
        //     url: "https://example.com",
        //     categories: [],
        // },
        // {
        //     title: "Tittle",
        //     description: "A really good description",
        //     url: "https://example.com",
        //     categories: [],
        // },
        // {
        //     title: "Tittle",
        //     description: "A really good description",
        //     url: "https://example.com",
        //     categories: [],
        // },
        // {
        //     title: "Tittle",
        //     description: "A really good description",
        //     url: "https://example.com",
        //     categories: [],
        // },
        // {
        //     title: "Tittle",
        //     description: "A really good description",
        //     url: "https://example.com",
        //     categories: [],
        // },
        // {
        //     title: "Tittle",
        //     description: "A really good description",
        //     url: "https://example.com",
        //     categories: [],
        // },
        // {
        //     title: "Tittle",
        //     description: "A really good description",
        //     url: "https://example.com",
        //     categories: [],
        // },
        // {
        //     title: "Tittle",
        //     description: "A really good description",
        //     url: "https://example.com",
        //     categories: [],
        // },
        // {
        //     title: "Tittle",
        //     description: "A really good description",
        //     url: "https://example.com",
        //     categories: [],
        }
    ]
};

export default projectsConfig;