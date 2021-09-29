import { compile } from 'handlebars';
import appStore, { StoreEventsType } from '../../services/store-manager';
import { UserResponse } from '../../types';
import BaseComponent from '../base-component';
import DialogUserItem from '../dialog-user-item/dialog-user-item';

// @ts-ignore
import images from '../../../public/img/*.png';

import './dialog-users-search-result-container.less';
import template from './dialog-users-search-result-container.tpl';

export default class DialogUserSearchResultContainer extends BaseComponent {
  constructor() {
    super('template', {
      className: '',
    });

    appStore.sub(StoreEventsType.dialogUserSearchResult, this.handleUsersSearchResult.bind(this));
  }

  private handleUsersSearchResult() {
    const foundUsers: UserResponse[] = appStore.getValue(StoreEventsType.dialogUserSearchResult);
    const users: UserResponse[] = appStore.getValue(StoreEventsType.chatUsers);

    const actualUsers = foundUsers.filter((item) => !users.some((e) => e.id === item.id));
    console.log('chat users', actualUsers);
    const children: Record<string, any> = {};
    if (users === null) return;
    for (const user of actualUsers) {
      children[`foundUser__${user.id}`] = new DialogUserItem({
        ...user,
        current: false,
        avatar: user.avatar ?? images.img_avatar_min,
      });
    }

    this.setProps({ children });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
