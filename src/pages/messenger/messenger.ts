import { compile } from 'handlebars';
import BaseComponent from '../../components/base-component';
import ChatDialogsPanel from '../../components/dialogs-panel';
import template from './messanger.tpl';
import router from '../..';
import ChatContentPanel from '../../components/content-container';
import ChatsApi from '../../services/api/chat';
import { DialogMessage, MessageResponse, UserResponse } from '../../types';
import appStore, { StoreEventsType } from '../../services/store-manager';
import CurrentDialogUsersPanel from '../../components/dialog-users-panel';
import accessController from '../../utils/access-controller';

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

  private handleSendMessage(message: string | null) {
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
      .then((response) => appStore.setValue(StoreEventsType.dialogsList, response));
  }

  private hanldeChangeActiveDialog() {
    appStore.setValue(StoreEventsType.chatUsers, null);
    appStore.setValue(StoreEventsType.dialogMessages, null);
    const dialogInfo = appStore.getValue(StoreEventsType.activeDialog);
    new ChatsApi()
      .chatUsers(dialogInfo.id)
      .then((response: UserResponse[]) => {
        appStore.setValue(StoreEventsType.chatUsers, response);
      })
      .then(() => {
        new ChatsApi().getChatToken(dialogInfo.id).then(({ token }) => {
          this.openWebSocket(appStore.getValue(StoreEventsType.currentUserInfo), dialogInfo, token);
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
      const currentUser = appStore.getValue(StoreEventsType.currentUserInfo);

      let messages = [];

      if (Array.isArray(response)) {
        messages = response
          .filter((m: MessageResponse) => m.type === 'message')
          .map((m: MessageResponse) => this.constructMessageItem(m, currentUser, currentChatUsers))
          .reverse();
      } else {
        messages = [
          this.constructMessageItem(response as MessageResponse, currentUser, currentChatUsers),
        ];
      }

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

    this._webSocket.addEventListener('close', () => {});
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

  componentDidMount() {
    accessController
      .userIsLoggined()
      .then((isLogged) => (isLogged ? this.fetchChatsList() : router.go('/')));
  }

  render() {
    const tpl = compile(template);
    return tpl(this.props);
  }
}
