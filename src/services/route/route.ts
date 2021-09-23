import BaseComponent from '../../components/base-component';
import render from '../../utils/render';

export default class Route<T extends BaseComponent> {
  private _pathname: string;

  private _blockClass: new () => T;

  private _block: T | null;

  private _props: Record<string, any>;

  constructor(pathname: string, view: new () => T, props: Record<string, any>) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  get pathname() {
    return this._pathname;
  }

  isMatch(path: string): boolean {
    return this._pathname === path;
  }

  navigate(path: string) {
    if (this.isMatch(path)) {
      this._pathname = path;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.rootQuery as string, this._block);
    }

    this._block?.show();
  }
}
