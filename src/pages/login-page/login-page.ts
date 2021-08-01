import { compile } from 'handlebars';
import BaseComponent from '../../components/base-component';
import FormField from '../../components/form-field/form-field';
import Button from '../../components/ui/button/button';
import { loginValidator, passwordValidator } from '../../helpers/validators';
import template from './login-page.tpl';

export default class LoginPage extends BaseComponent {
  constructor() {
    super('form', {
      title: 'Форма входа',
      class: 'form',
      children: {
        loginFormField: new FormField({
          caption: 'Логин',
          id: 'login_name',
          required: true,
          validator: loginValidator,
        }),
        passwordFormField: new FormField({
          caption: 'Пароль',
          id: 'password',
          required: true,
          validator: passwordValidator,
        }),
        submitFormButton: new Button({
          caption: 'Войти',
        }),
      },
      events: {
        submit: (e: any) => this.submitForm(e),
      },
    });
  }

  submitForm(e: any) {
    e.preventDefault();

    e.target.querySelectorAll('input').forEach((v: any) => console.log(v.value));
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    const { title } = this.props;
    return tpl({ title });
  }
}
