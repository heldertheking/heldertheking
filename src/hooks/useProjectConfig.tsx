import {useEffect, useState} from "react";
import projectsConfig, {type ProjectsConfig} from "../config/ProjectsConfig.ts";

function useProjectConfig() {
    const [config, setConfig] = useState<ProjectsConfig | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // TODO: Replace with actual data fetching logic later
    useEffect(() => {
        const loadConfig = async () => {
            setConfig(projectsConfig);
            setIsLoading(false);
        }

        loadConfig()
    }, []);

    return {config, isLoading};
}

export {useProjectConfig};