import BaseComponent from '../../components/base-component';
import Route from '../route/route';

export default class Router {
  private static __instance: Router;

  public history: History;

  private _routes: Array<Route<BaseComponent>>;

  private _currentRoute: Route<BaseComponent> | null;

  private _rootQuery: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this._routes = [];
    this.history = window.history;

    this._currentRoute = null;
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  get routes() {
    return this._routes;
  }

  get currentRoute() {
    return this._currentRoute;
  }

  use<T extends BaseComponent>(pathname: string, block: new () => T): this {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this._routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target: any = event.currentTarget;
      this.onRoute(target?.location?.pathname);
    };
    this.onRoute(window.location.pathname);
  }

  private onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      this.go('/404');
      window.location.pathname = '/404';
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    if (route) this._currentRoute = route;
    route?.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this.onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  private getRoute(pathname: string): Route<BaseComponent> | undefined {
    return this._routes.find((route) => route.isMatch(pathname));
  }
}
