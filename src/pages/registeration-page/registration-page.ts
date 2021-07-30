import { compile } from "handlebars";
import BaseComponent from "../../components/base-component";
import FormField from "../../components/form-field/form-field";
import Button from "../../components/ui/button/button";
import { emailValidator, firstNameValidator, loginValidator, passwordValidator } from "../../helpers/validators";
import template from "./registration-page.tpl";

export default class RegistrationPage extends BaseComponent {
  constructor() {
    super("main", {
      title: "Регистрация пользователя",
      class: "form-container",
      children: {
        firstNameFormField: new FormField({
          caption: "Имя",
          id: "first_name",
          required: true,
          validator: firstNameValidator,
        }),
        secondNameFormField: new FormField({
          caption: "Фамилия",
          id: "second_name",
          required: true,
          validator: firstNameValidator,
        }),
        loginFormField: new FormField({
          caption: "Логин",
          id: "login",
          required: true,
          validator: loginValidator,
        }),
        emailFormField: new FormField({
          caption: "E-mail",
          id: "email",
          type: "email",
          required: true,
          validator: emailValidator,
        }),
        passwordFormField: new FormField({
          caption: "Пароль",
          id: "password",
          type: "password",
          required: true,
          validator: passwordValidator,
        }),
        passwordRepeatFormField: new FormField({
          caption: "Пароль (еще раз)",
          id: "password-repeat",
          required: true,
          type: "password",
          validator: passwordValidator,
        }),

        submitFormButton: new Button({
          caption: "Зарегистрироваться",
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
