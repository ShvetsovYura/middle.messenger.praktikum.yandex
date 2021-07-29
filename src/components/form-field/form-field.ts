import { compile } from "handlebars";
import BaseComponent from "../base-component";
import InputErrrorMessage from "../ui/input-error-message/InputErrorMessage";
import Input from "../ui/input/input";
import template from "./form-field.tpl";

type FormFieldProps = {
  label: string;
  id: string;
  type?: "text" | "password" | "number";
  inline?: boolean;
  [key: string]: any;
};

export default class FormField extends BaseComponent {
  constructor(props: FormFieldProps, attributes: Record<string, any> = {}) {
    super(
      "div",
      {
        label: props.label,
        componentWrapperClass: props.inline ? "form-field form-field_inline" : "form-field",
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

  render() {
    const tpl = compile(template, { noEscape: true });
    const { id, label, componentWrapperClass } = this.props;
    return tpl({
      labelFor: id,
      label: label,
      componentWrapperClass,
    });
  }
}
