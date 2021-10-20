import { compile } from 'handlebars';
import appStore, { StoreEventsType } from '../../services/store-manager';
import BaseComponent from '../base-component';
import DialogUserItem from '../dialog-user-item';
// @ts-ignore
import * as img_avatar_min from '../../../public/img/img_avatar_min.png';

import './dialog-users-list.less';
import template from './dialog-users-list.tpl';

export class CurrentDialogUsersList extends BaseComponent {
  constructor() {
    super('template', {
      className: 'users-list-panel',
    });

    appStore.sub(StoreEventsType.chatUsers, this.handleChatUsersChange.bind(this));
  }

  private handleChatUsersChange() {
    const users = appStore.getValue(StoreEventsType.chatUsers);
    const children: Record<string, any> = {};
    if (users === null) return;
    for (const item of Object.keys(users)) {
      children[`user__${users[item].id}`] = new DialogUserItem({
        ...users[item],
        current: true,
        avatar: users[item].avatar ?? img_avatar_min,
      });
    }

    this.setProps({ children });
  }

  render() {
    const tpl = compile(template);
    return tpl({ data: this.props });
  }
}
