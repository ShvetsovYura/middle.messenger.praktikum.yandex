import { compile } from "handlebars";
import BaseComponent from "../base-component";
import InputErrrorMessage from "../ui/input-error-message/InputErrorMessage";
import Input from "../ui/input/input";
import Label from "../ui/label/label";
import template from "./form-field.tpl";

type FormFieldProps = {
  id: string;
  type?: "text" | "password" | "number" | "tel" | "email";
  required?: boolean;
  disabled?: boolean;
  inline?: boolean;
  caption: string;
  events?: Record<string, Function>;
  message?: string;
  value?: string;
};

export default class FormField extends BaseComponent {
  constructor(props: FormFieldProps, attributes: Record<string, any> = {}) {
    super(
      "div",
      {
        componentWrapperClass: props.inline ? "form-field form-field_inline" : "form-field",
        children: {
          label: new Label({
            caption: props.caption,
            for: props.id,
          }),
          input: new Input({
            id: props.id,
            name: props.id,
            required: props.required,
            disabled: props.disabled,
            events: props.events,
            value: props.value,
            type:props.type
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
