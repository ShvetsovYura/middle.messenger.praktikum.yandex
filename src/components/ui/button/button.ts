import { compile } from "handlebars";
import BaseComponent from "../../base-component";

const template = `{{ caption }}`;

type ButtonProps = {
  type?: "button" | "submit";
  caption: string;
  events?: any;
};

export default class Button extends BaseComponent {
  constructor(props: ButtonProps, attributes: Record<string, any>) {
    super("button", props, {
      ...attributes,
      class: attributes.class || "form-field__submit form-field__submit_large",
    });
  }
  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
