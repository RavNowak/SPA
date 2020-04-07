import { routes } from './routes';
import { badPath } from "../components/BadPathComponent/badPath";
import { nav } from '../navigation/nav';

export class Router {
  constructor() {
    this.body = $(document.body);
    this.outlet = $('main');
    this.routes = routes;
  }

  mount(outlet) {
    this.outlet = outlet;
  }

  init() {
    // const path = localStorage.getItem('path') || '/';
    // this.navigate(path);

    this.navigate(location.pathname);
  }

  get(path) {
    return this.routes.find(route => route.path === path);
  }

  has(path) {
    return this.get(path) !== undefined;
  }

  navigate(path) {
    if (this.has(path)) {
      const { component } = this.get(path);

      if(path === '/' || path === '/home') {
        this.outlet.append(component());
      }
      else {
        this.outlet.append(nav()).append(component());
      }

    } else {
      localStorage.setItem('path', '/');
      
      this.outlet.empty().append(badPath());
    }
  }
}
