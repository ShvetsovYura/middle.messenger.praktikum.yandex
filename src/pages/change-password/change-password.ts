import { compile } from "handlebars";
import BaseComponent from "../../components/base-component";
import FormField from "../../components/form-field/form-field";
import Button from "../../components/ui/button/button";
import Validator, { isVariousSymbols, longerThan, onlyEnLetters, ValidationResult } from "../../services/validator";
import template from "./change-password.tpl";

const loginValidator = new Validator().addRule(onlyEnLetters()).addRule(longerThan(6));
const passwordValidator = new Validator().addRule(isVariousSymbols()).addRule(longerThan(6));

export default class ChangePasswordPage extends BaseComponent {
  constructor() {
    super(
      "form",
      {
        title: "Сменить пароль",
        children: {
          currentPasswordFormField: new FormField({
            label: "Текущий пароль",
            id: "oldPassword",
            isRequired: true,
          }),
          newPasswordFormField: new FormField({
            label: "Новый пароль",
            id: "newPassword",
            isRequired: true,
          }),
          repeatNewPasswordFormField: new FormField({
            label: "Новый пароль (еще раз)",
            id: "repeatNewPassword",
            isRequired: true,
          }),

          submitFormButton: new Button(
            {
              caption: "Зарегистрироваться",
            },
            {}
          ),
        },
        events: {
          submit: (e: any) => this.submitForm(e),
        },
      },
      {
        class: "form form_small",
      }
    );
  }

  validateField(value: any, validator: any, componentName: string) {
    const res: ValidationResult = validator.validate(value);
    const { errorMessage } = this.props.children[componentName].props.children;
    if (!!res.valid) {
      errorMessage.setProps({ message: "" });
    } else {
      errorMessage.setProps({ message: res.message });
    }
  }

  submitForm(e: any) {
    e.preventDefault();

    // const f = new FormData(e.target.value);
    e.target.querySelectorAll("input").forEach((v: any) => console.log(v.value));
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    const { title } = this.props;
    return tpl({ title });
  }
}
