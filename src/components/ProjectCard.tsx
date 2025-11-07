import React from "react";
import type {ProjectItem} from "../config/ProjectsConfig.ts";

interface ProjectCardProps {
    ProjectItem: ProjectItem,
    animationDelay?: string
}

const ProjectCard: React.FC<ProjectCardProps> = (props) => (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 opacity-0 animate-fade-in" style={{ animationDelay: props.animationDelay || '0s' }}>
        <h2 className="text-2xl font-bold mb-2">{props.ProjectItem.title}</h2>
        <p className="text-gray-700 mb-4">
            {props.ProjectItem.description}
        </p>
        <a
            href={props.ProjectItem.url}
            className="text-blue-500 hover:underline"
        >
            Learn More
        </a>
        <div className="mt-4 flex flex-wrap gap-2">
            {props.ProjectItem.categories.map((category) => (
                <span
                    key={category}
                    className="bg-gray-200 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded"
                >
                    {category}
                </span>
            ))}
        </div>
    </div>
);

export default ProjectCard;