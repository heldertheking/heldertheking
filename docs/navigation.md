# Navigation bar

## Overview

The navigation bar will be a dynamic component that allows users to easily navigate through different sections of the application. It will be responsive and adapt to various screen sizes. It will receive categories and links as props to generate the menu items dynamicly. This approach will result in a more maintainable and scalable navigation system

## Features
- Responsive design
- Dynamic menu generation
- Easy integration with existing components
- Customizable styles using Tailwind CSS

## Structure

| Display Name | {Title} | About me | Contact | Projects | Additional Categories or links |
|--------------|---------|----------|---------|----------|--------------------------------|
| type         | Link    | Dropdown | Link    | Link     | Dropdown/Link                  |

## How the definition looks like

```tsx
const navigationItems = [
    { title: "Home", type: "link", href: "/" },
    {
        title: "About Me",
        type: "dropdown",
        items: [
            { title: "Biography", href: "/biography" },
            { title: "Skills", href: "/skills" },
        ],
    },
    { title: "Contact", type: "link", href: "/contact" },
    { title: "Projects", type: "link", href: "/projects" },
    {
        title: "More",
        type: "dropdown",
        items: [
            { title: "Blog", href: "/blog" },
            { title: "Gallery", href: "/gallery" },
        ],
    },
];
```