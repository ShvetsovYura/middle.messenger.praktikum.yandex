import { compile } from 'handlebars';
import BaseComponent from '../../components/base-component';
import FormField from '../../components/form-field/form-field';
import Button from '../../components/ui/button/button';
import {
  displayNameValidator,
  emailValidator,
  firstNameValidator,
  loginValidator,
  phoneValidator,
} from '../../helpers/validators';
import template from './profile-page.tpl';

export type UserInfo = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type ProfilePageProps = {
  userInfo: UserInfo;
};

export default class ProfilePage extends BaseComponent {
  constructor(props: ProfilePageProps) {
    // @eslint-ignore
    const { first_name, second_name, display_name, email, phone, login } = props.userInfo;
    super('main', {
      title: 'Профиль пользователя',
      class: 'form-container',
      children: {
        firstNameFormField: new FormField({
          caption: 'Имя',
          id: 'first_name',
          value: first_name,
          validator: firstNameValidator,
        }),
        secondNameFormField: new FormField({
          caption: 'Фамилия',
          id: 'second_name',
          value: second_name,
          required: true,
          validator: firstNameValidator,
        }),
        displayNameFormField: new FormField({
          caption: 'Отображаемое имя',
          id: 'display_name',
          value: display_name,
          validator: displayNameValidator,
        }),
        loginFormField: new FormField({
          caption: 'Логин',
          id: 'login',
          value: login,
          validator: loginValidator,
        }),
        emailFormField: new FormField({
          caption: 'E-mail',
          id: 'email',
          type: 'email',
          value: email,
          validator: emailValidator,
        }),
        phoneFormField: new FormField({
          caption: 'Телефон',
          id: 'phone',
          type: 'tel',
          value: phone,
          required: true,
          validator: phoneValidator,
        }),
        saveChangesFormButton: new Button({
          caption: 'Сохранить изменения',
          type: 'submit',
        }),
        resetChangesFormButton: new Button({
          caption: 'Отменить изменения',
          type: 'reset',
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
    for (let childKey of Object.keys(children)) {
      if (children[childKey] instanceof FormField) {
        const result = (children[childKey] as FormField).validateField();
        console.log('resutl', result);
        if (result === false) return;
      }
    }
    for (let childKey of Object.keys(children)) {
      if (children[childKey] instanceof FormField) {
        console.log(children[childKey].getValue());
      }
    }

    Array.from(e.target.querySelectorAll('input')).reduce((agg: any, cur: any) => {
      console.log(agg[cur.getAttribute('name')], cur.value);
      return (agg[cur.getAttribute('name')] = cur.value);
    }, {});
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    const { title } = this.props;
    return tpl({ title });
  }
}
