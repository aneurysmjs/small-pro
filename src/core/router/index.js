import findComponentByPath from './findComponentByPath.js';

const parseLocation = () => {
  console.log('location', location)
  return location.hash.slice(1).toLowerCase() || '/';
}

export default (routes) => {

  const router = (evt) => {
    // Find the component based on the current path
    const path = parseLocation();

    // If there's no matching route, get the "Error" component
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};
  
    document.getElementById('app').innerHTML = component.render();
  }

  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
}