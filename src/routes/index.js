import { createElement, lazy } from 'react';
import Home from '../pages/Home';

const About = lazy(() => import('../pages/About'));
const Services = lazy(() => import('../pages/Services'));
const ServiceDetail = lazy(() => import('../pages/ServiceDetail'));
const Projects = lazy(() => import('../pages/Projects'));
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'));
const Blogs = lazy(() => import('../pages/Blogs'));
const BlogDetail = lazy(() => import('../pages/BlogDetail'));
const Contact = lazy(() => import('../pages/Contact'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const routes = [
  { path: '/', element: createElement(Home) },
  { path: '/about', element: createElement(About) },
  { path: '/services', element: createElement(Services) },
  { path: '/services/:slug', element: createElement(ServiceDetail) },
  { path: '/projects', element: createElement(Projects) },
  { path: '/projects/:slug', element: createElement(ProjectDetail) },
  { path: '/blogs', element: createElement(Blogs) },
  { path: '/blogs/:slug', element: createElement(BlogDetail) },
  { path: '/contact', element: createElement(Contact) },
  { path: '*', element: createElement(NotFound) }
];
