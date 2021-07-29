import { compile } from "handlebars";
import BaseComponent from "../../components/base-component";
import FormField from "../../components/form-field/form-field";
import Button from "../../components/ui/button/button";
import Validator, { isVariousSymbols, longerThan, onlyEnLetters, ValidationResult } from "../../services/validator";
import template from "./login-page.tpl";

const loginValidator = new Validator().addRule(onlyEnLetters()).addRule(longerThan(6));
const passwordValidator = new Validator().addRule(isVariousSymbols()).addRule(longerThan(6));

export default class LoginPage extends BaseComponent {
  constructor() {
    super("div", {
      title: "Форма входа",
      children: {
        loginFormField: new FormField({
          label: "Логин",
          id: "login_name",
          isRequired: true,
          events: {
            blur: (e: any) => this.validateField(e.target.value, loginValidator, "loginFormField"),
            focus: (e: any) => this.validateField(e.target.value, loginValidator, "loginFormField"),
            input: (e: any) => this.validateField(e.target.value, loginValidator, "loginFormField"),
          },
        }),
        passwordFormField: new FormField({
          label: "Пароль",
          id: "password",
          isRequired: true,
          events: {
            blur: (e: any) => this.validateField(e.target.value, passwordValidator, "passwordFormField"),
            focus: (e: any) => this.validateField(e.target.value, passwordValidator, "passwordFormField"),
            input: (e: any) => this.validateField(e.target.value, passwordValidator, "passwordFormField"),
          },
        }),
        submitFormButton: new Button(
          {
            caption: "Войти",
          },
          {}
        ),
      },
      events: {
        submit: (e: any) => this.submitForm(e),
      },
    });
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
