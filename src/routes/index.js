import { createElement } from 'react';
import About from '../pages/About';
import BlogDetail from '../pages/BlogDetail';
import Blogs from '../pages/Blogs';
import Contact from '../pages/Contact';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import ProjectDetail from '../pages/ProjectDetail';
import Projects from '../pages/Projects';
import ServiceDetail from '../pages/ServiceDetail';
import Services from '../pages/Services';

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
