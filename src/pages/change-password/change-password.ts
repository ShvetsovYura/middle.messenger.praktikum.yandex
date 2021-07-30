import { compile } from "handlebars";
import BaseComponent from "../../components/base-component";
import FormField from "../../components/form-field/form-field";
import Button from "../../components/ui/button/button";
import { passwordValidator } from "../../helpers/validators";
import Validator, { isVariousSymbols, longerThan, onlyLatinLetters, ValidationResult } from "../../services/validator";
import template from "./change-password.tpl";

export default class ChangePasswordPage extends BaseComponent {
  constructor() {
    super("form", {
      title: "Сменить пароль",
      children: {
        currentPasswordFormField: new FormField({
          caption: "Текущий пароль",
          id: "oldPassword",
          required: true,
          type: "password",
          validator: passwordValidator,
        }),
        newPasswordFormField: new FormField({
          caption: "Новый пароль",
          id: "newPassword",
          required: true,
          type: "password",
          validator: passwordValidator,
        }),
        repeatNewPasswordFormField: new FormField({
          caption: "Новый пароль (еще раз)",
          id: "repeatNewPassword",
          required: true,
          type: "password",
          validator: passwordValidator,
        }),

        submitFormButton: new Button({
          caption: "Сменить пароль",
        }),
      },
      events: {
        submit: (e: any) => this.submitForm(e),
      },
    });
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
