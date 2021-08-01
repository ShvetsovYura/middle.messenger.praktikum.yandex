import { compile } from 'handlebars';
import BaseComponent from '../../components/base-component';
import FormField from '../../components/form-field/form-field';
import Button from '../../components/ui/button/button';
import { passwordValidator } from '../../helpers/validators';
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

        submitFormButton: new Button({
          caption: 'Сменить пароль',
        }),
      },
      events: {
        submit: (e: Event) => this.submitForm(e),
      },
    });
  }

  submitForm(e: any) {
    e.preventDefault();
    const result: Record<string, string> = {};
    e.target.querySelectorAll('input').forEach(({ name, value }: HTMLInputElement) => {
      result[name] = value;
    });
    console.log(result);
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
