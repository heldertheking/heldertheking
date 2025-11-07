import type { RouteObject } from 'react-router-dom';
import {BioPage, LandingPage, SkillsPage, ResumePage} from "../pages";
import ProjectsPage from "../pages/ProjectsPage.tsx";

// Define your routes here (similar to Angular's routing module)
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <LandingPage></LandingPage>
    },
    {
        path: '/about/bio',
        element: <BioPage></BioPage>
    },
    {
        path: '/about/skills',
        element: <SkillsPage></SkillsPage>
    },
    {
        path: '/about/resume',
        element: <ResumePage></ResumePage>
    },
    {
        path: '/projects',
        element: <ProjectsPage></ProjectsPage>
    }
];

