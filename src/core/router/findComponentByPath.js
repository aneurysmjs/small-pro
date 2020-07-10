/**
 * 
 * @param {string} path 
 * @param {{path: string, component: Component}[]} routes 
 */
export default (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;