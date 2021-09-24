import { compile } from 'handlebars';
import appStore, { StoreEventsType } from '../../services/store-manager';
import BaseComponent from '../base-component';
import ChatUserItem from '../chat-user-item/chat-user-item';
import './chat-users-list.less';
import template from './chat-users-list.tpl';

export default class ChatUsersList extends BaseComponent {
  constructor(props: any) {
    super('template', {
      className: 'users-list-panel',
    });

    appStore.sub(StoreEventsType.usersListIsOpen, this._toggle.bind(this));
    appStore.sub(StoreEventsType.chatUsers, this.handleChatUsersChange.bind(this));
  }

  private handleChatUsersChange() {
    const users = appStore.getValue(StoreEventsType.chatUsers);
    const chld: Record<string, any> = {};
    for (const item of Object.keys(users)) {
      chld[`user__${users[item].id}`] = new ChatUserItem({});
    }

    console.log('el', chld);
    this.setProps({ children: chld });
  }

  private _toggle() {
    if (appStore.getValue(StoreEventsType.usersListIsOpen)) {
      this.element.classList.add('users-list-panel--show');
    } else {
      this.element.classList.remove('users-list-panel--show');
    }
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl({ data: this.props });
  }
}
