import { compile } from "handlebars";
import { IRenderable } from "../../../pages/login-page";
import BaseComponent from "../../base-component";

export const template = `<input type="{{type}}" value="{{ value }}" />`;

type InputProps = {
  type: "text" | "password";
  value: string;
  events?: any;
};

export default class Input extends BaseComponent implements IRenderable {
  constructor(props: InputProps) {
    super("input", props);
  }
  render() {
    const tpl = compile(template.trim(), { noEscape: true });
    return tpl(this.props);
  }
}
