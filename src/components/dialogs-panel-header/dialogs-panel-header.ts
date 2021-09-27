import { compile } from 'handlebars';
import router from '../..';
import AuthApi from '../../services/api/auth';
import BaseComponent from '../base-component';
import Button from '../ui/button/button';
import template from './dialogs-panel-header.tpl';

export default class DialogsPanelHeader extends BaseComponent {
  constructor(props: any) {
    super('template', {
      ...props,
      children: {
        profileButton: new Button({
          caption: 'Профиль',
          events: {
            click: () => router.go('/settings'),
          },
        }),
        exitButton: new Button({
          caption: 'Выйти',
          events: {
            click: () => {
              new AuthApi().logOut().then(() => router.go('/'));
            },
          },
        }),
      },
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
