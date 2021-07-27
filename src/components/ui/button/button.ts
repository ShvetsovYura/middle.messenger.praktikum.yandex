import { compile } from "handlebars";
import { IRenderable } from "../../../pages/login-page";
import BaseComponent from "../../base-component";

export const template = `<button  type="{{type}}">{{ caption }}</button>`;

type ButtonProps = {
  type: "button" | "submit";
  caption: string;
  events?: any;
};

export default class Button extends BaseComponent {
  constructor(props: ButtonProps) {
    console.log("call constructor Button");
    super("button", props);
  }

  componentDidMount() {
    //пробуем менять через 2 сек.
    setTimeout(() => {
      this.setProps({ caption: "m" });
    }, 2000);
  }

  render() {
    console.log("render Button");
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
