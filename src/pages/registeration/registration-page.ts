import { compile } from 'handlebars';
import router from '../..';
import BaseComponent from '../../components/base-component';
import FormField from '../../components/form-field/form-field';
import Button from '../../components/ui/button/button';
import {
  emailValidator,
  firstNameValidator,
  loginValidator,
  passwordValidator,
  phoneValidator,
} from '../../utils/helpers/validators';
import AuthApi from '../../services/api/auth';
import { UserInfo } from '../profile/profile-page';
import template from './registration-page.tpl';

const firstNameFormField = new FormField({
  caption: 'Имя',
  id: 'first_name',
  required: true,
  validator: firstNameValidator,
});

const secondNameFormField = new FormField({
  caption: 'Фамилия',
  id: 'second_name',
  required: true,
  validator: firstNameValidator,
});

const loginFormField = new FormField({
  caption: 'Логин',
  id: 'login',
  required: true,
  validator: loginValidator,
});

const emailFormField = new FormField({
  caption: 'E-mail',
  id: 'email',
  type: 'email',
  required: true,
  validator: emailValidator,
});

const phoneFormField = new FormField({
  caption: 'Номер телефона',
  id: 'phone',
  type: 'tel',
  required: true,
  validator: phoneValidator,
});

const passwordFormField = new FormField({
  caption: 'Пароль',
  id: 'password',
  type: 'password',
  required: true,
  validator: passwordValidator,
});

const passwordRepeatFormField = new FormField({
  caption: 'Пароль (еще раз)',
  id: 'password-repeat',
  required: true,
  type: 'password',
  validator: passwordValidator,
});

const submitFormButton = new Button({
  caption: 'Зарегистрироваться',
  type: 'submit',
});

const toLoginButton = new Button({
  caption: 'Войти',
  events: {
    click: () => router.go('/'),
  },
});

export default class RegistrationPage extends BaseComponent {
  constructor() {
    super('template', {
      title: 'Регистрация пользователя',
      children: {
        firstNameFormField,
        secondNameFormField,
        loginFormField,
        emailFormField,
        phoneFormField,
        passwordFormField,
        passwordRepeatFormField,
        submitFormButton,
        toLoginButton,
      },
      events: {
        submit: (e: any) => this.submitForm(e),
      },
    });
  }

  submitForm(e: any) {
    e.preventDefault();
    if (
      loginFormField.validateField() &&
      firstNameFormField.validateField() &&
      secondNameFormField.validateField() &&
      loginFormField.validateField() &&
      emailFormField.validateField() &&
      phoneFormField.validateField() &&
      passwordFormField.validateField() &&
      passwordRepeatFormField.validateField()
    ) {
      if (passwordFormField.getValue() !== passwordRepeatFormField.getValue()) {
        alert('Введенные пароли не совпадают');
        return;
      }
      const userData: UserInfo = Array.prototype.reduce.call(
        e.target.querySelectorAll('input'),
        (acc: any, cur: any) => {
          acc = { ...acc, [cur.name]: cur.value };
          return acc;
        },
        {},
      );
      new AuthApi().signUp(userData).then((resp: XMLHttpRequest) => {
        if (resp.status === 200) {
          router.go('/');
        }
      });
    }
  }

  render() {
    const tpl = compile(template);
    const { title } = this.props;
    return tpl({ title });
  }
}
