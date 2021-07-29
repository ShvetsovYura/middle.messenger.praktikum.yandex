import BaseComponent from "../../base-component";

export type InputProps = {
  type?: "text" | "password" | "number";
  id: string;
  name: string;
  className?: string;
  isRequired?: boolean;
  events?: Record<string, Function>;
};

export default class Input extends BaseComponent {
  constructor(props: InputProps) {
    super(
      "input",
      {
        ...props,
        type: props.type || "text",
        required: props.isRequired === true ? "required" : "",
      },
      {
        class: "form-field__input form-field__input_underlined",
      }
    );
  }
  render() {
    return "";
  }
}
