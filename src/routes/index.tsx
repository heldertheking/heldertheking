import type {RouteObject} from 'react-router-dom';
import {BioPage, ContactPage, LandingPage, NotFoundPage, ProjectsPage, ResumePage, SkillsPage} from "../pages";

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
    },
    {
        path: '/contact',
        element: <ContactPage></ContactPage>
    },
    {
        path: '*',
        element: <NotFoundPage></NotFoundPage>
    }
];

