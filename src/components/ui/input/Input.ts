import BaseComponent from "../../base-component";

export type InputProps = {
  type?: "text" | "password" | "number" | "tel" | "email";
  id: string;
  name: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  events?: Record<string, Function>;
  value?: string;
};

export default class Input extends BaseComponent {
  constructor(props: InputProps) {
    super("input", {
      ...props,
      type: props.type || "text",
      value: props.value || "",
      class: "form-field__input form-field__input_underlined",
    });
  }



  render() {
    return "";
  }
}
