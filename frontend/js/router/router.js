import $ from "jquery";
import { routes } from './routes';
import { badPath} from "../views";
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

      this.outlet.empty().append(nav()).hide().show(1500);
      this.outlet.append(component());
      
    } else {
      this.outlet.empty().append(badPath());
    }
  
    history.pushState(data, '', path);
  }
}
