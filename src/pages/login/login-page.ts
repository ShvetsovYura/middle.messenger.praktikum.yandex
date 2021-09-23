import { compile } from 'handlebars';
import router from '../..';
import BaseComponent from '../../components/base-component';
import FormField from '../../components/form-field/form-field';
import Button from '../../components/ui/button/button';
import { loginValidator, passwordValidator } from '../../helpers/validators';
import AuthApi from '../../services/api/auth';
import UserApi from '../../services/api/user';
import template from './login-page.tpl';

export default class LoginPage extends BaseComponent {
  constructor() {
    const loginFormField = new FormField({
      caption: 'Логин',
      id: 'login_name',
      required: true,
    });
    const passwordFormField = new FormField({
      caption: 'Пароль',
      id: 'password',
      type: 'password',
      required: true,
    });

    const submitFormButton = new Button({
      caption: 'Войти',
      type: 'submit',
    });

    const toRegistrationFormButton = new Button({
      caption: 'Зарегистрироваться',
      events: {
        click: () => router.go('/sign-up'),
      },
    });

    super('template', {
      title: 'Форма входа',
      children: {
        loginFormField,
        passwordFormField,
        submitFormButton,
        toRegistrationFormButton,
      },
      events: {
        submit: (e: any) => this.submitForm(e),
      },
    });
  }

  submitForm(e: any) {
    e.preventDefault();
    const { children = {} } = this.props;
    for (const childKey of Object.keys(children)) {
      if (children[childKey] instanceof FormField) {
        const result = (children[childKey] as FormField).validateField();
        if (result === false) return;
      }
    }
    const result: Record<string, string> = {};
    e.target.querySelectorAll('input').forEach((v: HTMLInputElement) => {
      result[v.name] = v.value;
    });
    const login = e.target.querySelector('#login_name');
    const password = e.target.querySelector('#password');

    new AuthApi().signIn(login.value, password.value).then((signInResponse: Response) => {
      if (signInResponse.status === 200 && signInResponse.statusText === 'OK') {
        router.go('/messenger');
      }
    });
  }

  componentDidMount() {}

  render() {
    new AuthApi().userInfo().then((resp: Response) => {
      if (resp.status === 200) {
        router.go('/messenger');
      }
    });
    const tpl = compile(template, { noEscape: true });
    const { title } = this.props;
    return tpl({ title });
  }
}
