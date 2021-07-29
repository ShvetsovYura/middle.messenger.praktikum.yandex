import { compile } from "handlebars";
import BaseComponent from "../base-component";
import InputErrrorMessage from "../ui/input-error-message/InputErrorMessage";
import Input from "../ui/input/input";
import template from "./form-field.tpl";

type FormFieldProps = {
  label: string;
  id: string;
  type?: "text" | "password" | "number";
  [key: string]: any;
};

export default class FormField extends BaseComponent {
  constructor(props: FormFieldProps, attributes: Record<string, any> = {}) {
    super(
      "div",
      {
        label: props.label,
        children: {
          input: new Input({
            id: props.id,
            name: props.id,
            isRequired: props.isRequired,
            events: props.events,
          }),
          errorMessage: new InputErrrorMessage({ message: props.message || "" }),
        },
      },
      {
        ...attributes,
        
      }
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.children.input.setProps({ id: "ololo" });
    }, 3000);
    // return new Promise((res) =>
    //   setTimeout(() => {
    //     this.setProps()
    //     res(null);
    //   }, 2000)
    // ).then(() =>
    //   setTimeout(() => {
    //     this.show();
    //   }, 3000)
    // );
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    const { label, id } = this.props;
    return tpl({ label: label, labelFor: id });
  }
}
