import { compile } from 'handlebars';
import router from '../..';
import BaseComponent from '../../components/base-component';
import FormField from '../../components/form-field/form-field';
import Button from '../../components/ui/button/button';
import { passwordValidator } from '../../helpers/validators';
import UserApi from '../../services/api/user';
import template from './change-password.tpl';

export default class ChangePasswordPage extends BaseComponent {
  constructor() {
    super('main', {
      title: 'Сменить пароль',
      class: 'form-container',
      children: {
        currentPasswordFormField: new FormField({
          caption: 'Текущий пароль',
          id: 'oldPassword',
          required: true,
          type: 'password',
          validator: passwordValidator,
        }),
        newPasswordFormField: new FormField({
          caption: 'Новый пароль',
          id: 'newPassword',
          required: true,
          type: 'password',
          validator: passwordValidator,
        }),
        repeatNewPasswordFormField: new FormField({
          caption: 'Новый пароль (еще раз)',
          id: 'repeatNewPassword',
          required: true,
          type: 'password',
          validator: passwordValidator,
        }),
        backButton: new Button({
          caption: '<- в настройки',
          events: {
            click: () => router.go('/settings'),
          },
        }),

        submitFormButton: new Button({
          caption: 'Сменить пароль',
          type: 'submit',
        }),
      },
      events: {
        submit: (e: Event) => this.submitForm(e),
      },
    });
  }

  submitForm(e: any) {
    e.preventDefault();
    const oldPwd = e.target.querySelector('#oldPassword');
    const newPwd = e.target.querySelector('#newPassword');
    const repNewPwd = e.target.querySelector('#repeatNewPassword');

    if (newPwd.value !== repNewPwd.value) {
      alert('Пароли не совпадают');
      return;
    }
    new UserApi().changeUserPassword(oldPwd.value, newPwd.value).then(() => {
      alert('Пароли изменены, бро');
      router.go('/settings');
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
