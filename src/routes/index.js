import { Home } from '../components/Home.js';
import { About } from '../components/About.js';
import { Page2 } from '../components/Page2.js';

// Routes 
export default [
  { path: '/', component: Home, },
  { path: '/about', component: About, },
  { path: '/page2', component: Page2, },
];