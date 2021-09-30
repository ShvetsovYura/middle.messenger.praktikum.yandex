import { compile } from 'handlebars';
import BaseComponent from '../../components/base-component';
import ChatDialogsPanel, {
  ChatDialogsPanelProps,
} from '../../components/dialogs-panel/dialogs-panel';
import template from './messanger.tpl';
import router from '../..';
import AuthApi from '../../services/api/auth';
import ChatContentPanel from '../../components/content-container/content-container';
import ChatsApi from '../../services/api/chat';
import { DialogMessage, MessageResponse, UserResponse } from '../../types';
import appStore, { StoreEventsType } from '../../services/store-manager';
import CurrentDialogUsersList from '../../components/dialog-users-list/dialog-users-list';
import CurrentDialogUsersPanel from '../../components/dialog-users-panel';

export type MessengersPageProps = ChatDialogsPanelProps & MessagesContainerProps;

export default class MessengerPage extends BaseComponent {
  private _webSocket: WebSocket | null = null;

  constructor() {
    super('template', {
      children: {
        chatDialogsPanel: new ChatDialogsPanel({
          dialogs: [],
        }),
        chatContentPanel: new ChatContentPanel({
          onSendMessage: (message: string) => this.handleSendMessage(message),
        }),
        currentDialogUsersPanel: new CurrentDialogUsersPanel(),
      },
    });

    appStore.sub(StoreEventsType.activeDialog, this.hanldeChangeActiveDialog.bind(this));
  }

  componentDidMount() {
    console.log('userinfo');
    new AuthApi()
      .userInfo()
      .then((resp: XMLHttpRequest) => {
        if (resp.status === 401) {
          router.go('/');
        }
        if (resp.status === 200) {
          const userInfo: UserResponse = JSON.parse(resp.response);
          appStore.setValue(StoreEventsType.currentUserInfo, userInfo);
          this.fetchChatsList();
        }
      })
      .catch((e) => {
        if (e.status === 401) {
          router.go('/');
        }
      });
  }

  private handleSendMessage(message: string | null) {
    console.log('send messages', message);

    if (message === '' || message === null) return;
    if (this._webSocket) {
      this._webSocket.send(
        JSON.stringify({
          content: message,
          time: new Date(),
          type: 'message',
        }),
      );
    }
  }

  private fetchChatsList() {
    new ChatsApi()
      .chatsList()
      .then((response: XMLHttpRequest) =>
        appStore.setValue(StoreEventsType.dialogsList, JSON.parse(response.response)),
      );
  }

  private hanldeChangeActiveDialog() {
    appStore.setValue(StoreEventsType.chatUsers, null);
    appStore.setValue(StoreEventsType.dialogMessages, null);
    const dialogInfo = appStore.getValue(StoreEventsType.activeDialog);
    console.log('activeDialog', dialogInfo);
    new ChatsApi()
      .chatUsers(dialogInfo.id)
      .then((response: XMLHttpRequest) => {
        const result: Array<UserResponse> = JSON.parse(response.response);

        appStore.setValue(StoreEventsType.chatUsers, result);
      })
      .then(() => {
        new ChatsApi().getChatToken(dialogInfo.id).then((resp: XMLHttpRequest) => {
          if (resp.status === 200) {
            const tokenObject: { token: string } = JSON.parse(resp.response);
            this.openWebSocket(
              appStore.getValue(StoreEventsType.currentUserInfo),
              dialogInfo,
              tokenObject.token,
            );
          }
        });
      });
  }

  private openWebSocket(user: any, chat: any, token: string): void {
    this._webSocket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${user.id}/${chat.id}/${token}`,
    );

    this._webSocket.addEventListener('message', (event) => {
      const response = JSON.parse(event.data);

      const currentChatUsers = appStore.getValue(StoreEventsType.chatUsers);
      console.log('ccu', currentChatUsers);
      const currentUser = appStore.getValue(StoreEventsType.currentUserInfo);

      const messages = Array.isArray(response)
        ? response
            .filter((m: MessageResponse) => m.type === 'message')
            .map((m: MessageResponse) =>
              this.constructMessageItem(m, currentUser, currentChatUsers),
            )
            .reverse()
        : [this.constructMessageItem(response as MessageResponse, currentUser, currentChatUsers)];

      appStore.concatenateArraysValues(StoreEventsType.dialogMessages, messages);
    });

    this._webSocket.addEventListener('open', () => {
      this._webSocket?.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        }),
      );
    });

    this._webSocket.addEventListener('close', () => {
      console.log('Соединение закрыто');
    });
  }

  private constructMessageItem(
    messageItem: MessageResponse,
    currentUser: any,
    dialogUsers: any,
  ): DialogMessage {
    const userInfo = dialogUsers.find((el: any) => el.id === messageItem.user_id);
    return {
      ...messageItem,
      isCurrentUser: currentUser.id === messageItem.user_id,
      displayUserName: userInfo ? this.getDisplayName(userInfo) : 'UnknownUser',
    };
  }

  private getDisplayName(userInfo: any) {
    if (userInfo.display_name) return userInfo.display_name;
    return [userInfo.first_name, userInfo.second_name].join(' ');
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
