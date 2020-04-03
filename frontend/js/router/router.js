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
    this.navigate(location.pathname)
  }

  get(path) {
    return this.routes.find(route => route.path === path);
  }

  has(path) {
    return this.get(path) !== undefined;
  }

  navigate(path, data = {}) {
    if (this.has(path)) {
      const { component } = this.get(path);

      this.outlet.append(nav()).append(component());

    } else {
      this.outlet.empty().append(badPath());
    }

    history.pushState(data, '', path);
  }
}
