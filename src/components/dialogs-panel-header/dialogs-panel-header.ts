import { compile } from 'handlebars';
import router from '../..';
import AuthApi from '../../services/api/auth';
import BaseComponent from '../base-component';
import Button from '../ui/button/button';
import './dialogs-panel-header.less';
import template from './dialogs-panel-header.tpl';

// @ts-ignore
import images from '../../../public/img/*.png';
import appStore, { StoreEventsType } from '../../services/store-manager';
import Input from '../ui/input';
import ChatsApi from '../../services/api/chat';
import { sanitize } from '../../utils/helpers/helper-functions';

export default class DialogsPanelHeader extends BaseComponent {
  constructor(props: any) {
    super('template', {
      ...props,
      children: {
        profileButton: new Button({
          caption: 'В профиль',
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
        dialogNameInput: new Input({
          name: 'dialogName',
          id: 'dialogName',
          autocomplete: 'off',
        }),
        dialogAddActionButton: new Button({
          caption: 'Добавить',
          events: {
            click: () => {
              const { value } = this.props.children.dialogNameInput.element;

              new ChatsApi()
                .createChat(sanitize(value))
                .then(() => new ChatsApi().chatsList())
                .then((resp: XMLHttpRequest) => {
                  appStore.concatenateArraysValues(
                    StoreEventsType.dialogsList,
                    JSON.parse(resp.response),
                  );
                });
            },
          },
        }),
      },
    });

    appStore.sub(StoreEventsType.currentUserInfo, () => {
      this.setProps({ ...appStore.getValue(StoreEventsType.currentUserInfo) });
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    const avatar = this.props.avatar ?? images.img_avatar_min;
    return tpl({ ...this.props, avatar });
  }
}
