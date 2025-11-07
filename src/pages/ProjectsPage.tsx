import React, { useState } from "react";
import {useProjectConfig} from "../hooks";
import ProjectCard from "../components/ProjectCard.tsx";
import SearchBar from "../components/SearchBar.tsx";
import {ProjectCategory} from "../config/ProjectsConfig.ts";

const ProjectsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const projectConfig = useProjectConfig();
    const projects = projectConfig.config?.projects;
    const isLoading = projectConfig.isLoading;

    if (isLoading) {
        return <div className="text-4xl font-bold mb-4">Loading...</div>;
    }

    if (!isLoading && (!projects || projects.length === 0)) {
        return <div className="text-4xl font-bold mb-4">No projects found.</div>;
    }

    // Filter projects by title or any category matching the search query
    const filteredProjects = projects?.filter(project => {
        const titleMatch = project.title && project.title.toLowerCase().includes(searchQuery.toLowerCase());
        const categories = Array.isArray(project.categories) ? project.categories : [];
        const categoryMatch = categories.some(
            (cat) => cat && cat.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return titleMatch || categoryMatch;
    });

    return (
        <div className="flex flex-col items-center min-h-full w-full max-w-[70vw] mx-auto">
            <header className="flex items-center justify-between w-full">
                <h2 className="text-4xl font-bold mb-4">Projects</h2>
                <form role="search" className="w-1/4 min-w-[250px]">
                    <SearchBar
                        suggestions={ProjectCategory.getCategories()}
                        value={searchQuery}
                        onChange={setSearchQuery}
                    />
                </form>
            </header>
            <section className="project-list grid h-full grid-cols-3 gap-6 w-full">
                {
                    filteredProjects?.map((project, index) => {
                        return (
                            <ProjectCard key={index} animationDelay={`${index * 0.2}s`}
                                         ProjectItem={project}></ProjectCard>
                        );
                    })
                }
            </section>
        </div>
    );
};

export default ProjectsPage;