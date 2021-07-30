import { compile } from "handlebars";
import BaseComponent from "../../components/base-component";
import FormField from "../../components/form-field/form-field";
import Button from "../../components/ui/button/button";
import Validator, { isVariousSymbols, longerThan, onlyEnLetters, ValidationResult } from "../../services/validator";
import template from "./profile-page.tpl";

const loginValidator = new Validator().addRule(onlyEnLetters()).addRule(longerThan(6));
const passwordValidator = new Validator().addRule(isVariousSymbols()).addRule(longerThan(6));

export default class ProfilePage extends BaseComponent {
  constructor() {
    super("main", {
      title: "Профиль пользователя",
      class: "form-container",
      children: {
        firstNameFormField: new FormField({
          caption: "Имя",
          id: "first_name",
          disabled: true,
          inline: true,
          underline: true,
        }),
        secondNameFormField: new FormField({
          caption: "Фамилия",
          id: "second_name",
          required: true,
          value: "sdmsms",
        }),
        displayNameFormField: new FormField({
          caption: "Отображаемое имя",
          id: "display_name",
        }),
        loginFormField: new FormField({
          caption: "Логин",
          id: "login",
        }),
        emailFormField: new FormField({
          caption: "E-mail",
          id: "email",
          type: "email",
        }),
        phoneFormField: new FormField({
          caption: "Телефон",
          id: "phone",
          type: "tel",
        }),
        saveChangesFormButton: new Button({
          caption: "Сохранить изменения",
        }),
        resetChangesFormButton: new Button({
          caption: "Отменить изменения",
        }),
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
