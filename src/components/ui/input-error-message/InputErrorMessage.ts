import { compile } from "handlebars";
import BaseComponent from "../../base-component";
const template = `{{ message }}`;
export default class InputErrrorMessage extends BaseComponent {
  constructor(props: any) {
    super(
      "span",
      {
        ...props,
      },
      {
        class: "form-field__error-message",
      }
    );
  }
  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
