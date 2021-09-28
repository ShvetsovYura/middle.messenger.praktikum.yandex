import { compile } from 'handlebars';
import router from '../..';
import BaseComponent from '../../components/base-component';
import FormField from '../../components/form-field/form-field';
import Button from '../../components/ui/button/button';
import AuthApi from '../../services/api/auth';
import template from './login-page.tpl';
import appStore, { StoreEventsType } from '../../services/store-manager';
import { UserResponse } from '../../types';

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

  private submitForm(e: any) {
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

    this.setProps({ error: null });

    new AuthApi()
      .signIn(login.value, password.value)
      .then(({ status, statusText }: Response) => {
        if (status === 200 && statusText === 'OK') {
          router.go('/messenger');
        }
      })
      .catch((err) => this.setProps({ error: JSON.parse(err.response).reason }));
  }

  render() {
    new AuthApi().userInfo().then((resp: XMLHttpRequest) => {
      if (resp.status === 200) {
        const userInfo: UserResponse = JSON.parse(resp.response);
        appStore.setValue(StoreEventsType.currentUserInfo, userInfo);
        router.go('/messenger');
      }
    });

    const tpl = compile(template);
    const { title, error } = this.props;
    return tpl({ title, error });
  }
}
