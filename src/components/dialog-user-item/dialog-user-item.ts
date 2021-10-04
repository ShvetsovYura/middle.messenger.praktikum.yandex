import { compile } from 'handlebars';
import ChatsApi from '../../services/api/chat';
import appStore, { StoreEventsType } from '../../services/store-manager';
import { UserResponse } from '../../types';
import BaseComponent from '../base-component';
import Button from '../ui/button/button';
import './dialog-user-item.less';
import template from './dialog-user-item.tpl';

export class DialogUserItem extends BaseComponent {
  constructor(props: any) {
    super('template', {
      ...props,
      className: 'dialog-user-item',
      children: {
        actionButton: new Button({
          caption: props.current ? 'person_remove' : 'person_add_alt',
          isIcon: true,
          events: {
            click: () => {
              const { id } = appStore.getValue(StoreEventsType.activeDialog);
              if (this.props.current) {
                this.handleRemoveUserFromDialog(id, this.props.id);
              } else {
                this.handleAddUserToDialog(id, this.props.id);
              }
            },
          },
        }),
      },
    });
  }

  private handleRemoveUserFromDialog(chatId: number, userId: number) {
    new ChatsApi()
      .removeUsers({ users: [userId], chatId })
      .then(() => new ChatsApi().chatUsers(chatId))
      .then((response: UserResponse[]) => this.refreshFoundList(userId, response));
  }

  private handleAddUserToDialog(chatId: number, userId: number) {
    new ChatsApi()
      .addUsers({ users: [userId], chatId })
      .then(() => new ChatsApi().chatUsers(chatId))
      .then((response: UserResponse[]) => this.refreshFoundList(userId, response));
  }

  private refreshFoundList(userId: number, users: UserResponse[]) {
    appStore.setValue(StoreEventsType.chatUsers, users);
    const foundUsers: UserResponse[] = appStore.getValue(StoreEventsType.dialogUserSearchResult);
    appStore.setValue(
      StoreEventsType.dialogUserSearchResult,
      foundUsers.filter((u) => u.id !== userId),
    );
  }

  render() {
    const tpl = compile(template);
    return tpl(this.props);
  }
}
