import { compile } from 'handlebars';
import BaseComponent from '../../components/base-component';
import FormField from '../../components/form-field/form-field';
import Button from '../../components/ui/button/button';
import './profile-page.less';
import '../../styles/register.less';

import accessController from '../../utils/access-controller';

import {
  displayNameValidator,
  emailValidator,
  firstNameValidator,
  loginValidator,
  phoneValidator,
} from '../../utils/helpers/validators';
import template from './profile-page.tpl';
import router from '../..';
import AuthApi from '../../services/api/auth';
import UserApi from '../../services/api/user';

export type UserInfo = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type FullUserInfo = UserInfo & { avatar: string; status: string };

export type ProfilePageProps = {
  userInfo: UserInfo;
};

export default class ProfilePage extends BaseComponent {
  constructor() {
    super('main', {
      title: 'Профиль пользователя',
      children: {
        backButton: new Button({
          isIcon: true,
          caption: 'arrow_back',
          className: 'form-header-container__back-button',
          events: {
            click: () => router.go('/messenger'),
          },
        }),
        firstNameFormField: new FormField({
          caption: 'Имя',
          id: 'first_name',
          validator: firstNameValidator,
        }),
        secondNameFormField: new FormField({
          caption: 'Фамилия',
          id: 'second_name',
          required: true,
          validator: firstNameValidator,
        }),
        displayNameFormField: new FormField({
          caption: 'Отображаемое имя',
          id: 'display_name',
          validator: displayNameValidator,
        }),
        loginFormField: new FormField({
          caption: 'Логин',
          id: 'login',
          validator: loginValidator,
        }),
        emailFormField: new FormField({
          caption: 'E-mail',
          id: 'email',
          type: 'email',
          validator: emailValidator,
        }),
        phoneFormField: new FormField({
          caption: 'Телефон',
          id: 'phone',
          type: 'tel',
          required: true,
          validator: phoneValidator,
        }),
        saveChangesFormButton: new Button({
          caption: 'Сохранить изменения',
          type: 'submit',
        }),

        changePwdButton: new Button({
          caption: 'Сменить пароль',
          events: {
            click: () => router.go('/change-password'),
          },
        }),
        logoutButton: new Button({
          caption: 'Выйти',
          events: {
            click: () => {
              new AuthApi().logOut().then(({ status, statusText }: Response) => {
                if (status === 200 && statusText === 'OK') {
                  router.go('/');
                }
              });
            },
          },
        }),
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

    const result: Record<string, string> = Array.prototype.reduce.call(
      e.target.querySelectorAll('input'),
      (acc: any, cur: any) => {
        acc = { ...acc, [cur.name]: cur.value };
        return acc;
      },
      {},
    );

    new UserApi().saveUserProfile(result as UserInfo).then(() => this.loadUserInfo());
  }

  private loadUserInfo() {
    const {
      firstNameFormField,
      secondNameFormField,
      displayNameFormField,
      loginFormField,
      emailFormField,
      phoneFormField,
    } = this.props.children;

    new AuthApi().userInfo().then((response: XMLHttpRequest) => {
      if (response.status === 200) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { first_name, second_name, display_name, email, phone, login } = JSON.parse(
          response.response,
        );
        firstNameFormField.setValue(first_name);
        secondNameFormField.setValue(second_name);
        displayNameFormField.setValue(display_name);
        loginFormField.setValue(login);
        emailFormField.setValue(email);
        phoneFormField.setValue(phone);
      }
    });
  }

  componentDidMount() {
    accessController
      .userIsLoggined()
      .then((isLogged) => (isLogged ? this.loadUserInfo() : router.go('/')));
  }

  render() {
    const tpl = compile(template);
    const { title } = this.props;
    return tpl({ title });
  }
}
