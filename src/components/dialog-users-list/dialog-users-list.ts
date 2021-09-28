import { compile } from 'handlebars';
import appStore, { StoreEventsType } from '../../services/store-manager';
import BaseComponent from '../base-component';
import DialogUserItem from '../dialog-user-item/dialog-user-item';
import './dialog-users-list.less';
import template from './dialog-users-list.tpl';

export default class CurrentDialogUsersList extends BaseComponent {
  constructor() {
    super('template', {
      className: 'users-list-panel',
    });

    appStore.sub(StoreEventsType.chatUsers, this.handleChatUsersChange.bind(this));
  }

  private handleChatUsersChange() {
    const users = appStore.getValue(StoreEventsType.chatUsers);
    const chld: Record<string, any> = {};
    if (users === null) return;
    for (const item of Object.keys(users)) {
      console.log({ ...users[item] });
      chld[`user__${users[item].id}`] = new DialogUserItem({ ...users[item], current: true });
    }

    console.log('el', chld);
    this.setProps({ children: chld });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl({ data: this.props });
  }
}
