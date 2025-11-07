export interface NavigationItem {
    title: string;
    type: "link" | "dropdown";
    locked?: boolean;
    url?: string;
    children?: NavigationItem[];
}

export const navigationConfig: NavigationItem[] = [
    {
        title: "Hélder Oliveira",
        type: "link",
        url: "/",
    },
    {
        title: "About me",
        type: "dropdown",
        children: [
            {
                title: "Bio",
                type: "link",
                url: "/about/bio",
            },
            {
                title: "Skills",
                type: "link",
                url: "/about/skills",
            },
            {
                title: "Resume",
                type: "link",
                url: "/about/resume",
                locked: true,
            },
        ],
    },
    {
        title: "Projects",
        type: "link",
        url: "/projects",
    },
    {
        title: "Contact",
        type: "link",
        url: "/contact",
    },
    {
        title: "Blog",
        type: "link",
        url: "/blog",
    },
    {
        title: "Other",
        type: "dropdown",
        children: [
            {
                title: "Playground",
                type: "link",
                url: "/other/playground",
            },
            {
                title: "Gallery",
                type: "link",
                url: "/other/gallery",
            },
            {
                title: "Favorites",
                type: "link",
                url: "/other/favorites",
            },
            {
                title: "CLI",
                type: "link",
                url: "/other/cli",
            }
        ],
    }
]