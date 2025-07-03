type param = string | number;

class RouteItem {
  public key: string;
  private _base?: RouteItem;
  public route: string;
  public path: string;
  constructor(_key: param, base?: RouteItem) {
    this.key = _key.toString();
    this._base = base;
    this.route = `${this._base ? "" : `/`}${this.key}/*`;
    this.path = `${this._base ? `${this._base.path}/` : `/`}${this.key}`;
  }
}

export const __PATH = {
  login: "/login",
  signup: "/signup",
  panel: new RouteItem("panel"),
  charts: () => new RouteItem("charts", __PATH.panel),
  alarms: () => new RouteItem("alarms", __PATH.panel),
};
