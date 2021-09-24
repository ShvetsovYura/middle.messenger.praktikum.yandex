import { compile } from 'handlebars';
import BaseComponent from '../../components/base-component';
import ChatDialogsPanel, {
  ChatDialogsPanelProps,
} from '../../components/chat-dialogs-panel/chat-dialogs-panel';
import { MessagesContainerProps } from '../../components/messages-container/messages-container';
import template from './messanger.tpl';
import router from '../..';
import AuthApi from '../../services/api/auth';
import ChatContentPanel from '../../components/chat-content-panel/chat-content-panel';
import ChatsApi from '../../services/api/chat';
import WSClient from '../../services/api/webSocket';
import { UserResponse } from '../../types';
import appStore, { StoreEventsType } from '../../services/store-manager';

export type MessengersPageProps = ChatDialogsPanelProps & MessagesContainerProps;
let chatsList: Array<any> = [];

const chatContentPanel = new ChatContentPanel({ messages: [], data: {} });

export default class MessengerPage extends BaseComponent {
  private _acitveDialog: number | null = null;

  private _chatUsers: Record<string, UserResponse> | null = null;

  private _messages: [] | null = null;

  private _userInfo: UserResponse | null = null;

  constructor(props: any) {
    super('template', {
      ...props,
      children: {
        chatDialogsPanel: new ChatDialogsPanel({
          dialogs: [],
        }),
        chatContentPanel,
      },
    });

    appStore.sub(StoreEventsType.activeDialog, this.hanldeChangeActiveDialog);
  }

  componentDidMount() {
    new AuthApi()
      .userInfo()
      .then((resp: XMLHttpRequest) => {
        if (resp.status === 401) {
          router.go('/');
        }
        if (resp.status === 200) {
          this._userInfo = JSON.parse(resp.response);
          this.fetchChatsList();
        }
      })
      .catch((e) => {
        if (e.status === 401) {
          router.go('/');
        }
      });
  }

  private fetchChatsList() {
    new ChatsApi()
      .chatsList()
      .then((response: XMLHttpRequest) =>
        appStore.setValue(StoreEventsType.dialogsList, JSON.parse(response.response)),
      );
  }

  private hanldeChangeActiveDialog() {
    console.log('appStore', appStore);
    const dialogInfo = appStore.getValue(StoreEventsType.activeDialog);
    console.log(dialogInfo);
    new ChatsApi().chatUsers(dialogInfo.id).then((response: XMLHttpRequest) => {
      const result: Array<UserResponse> = JSON.parse(response.response);
      const chatUsers: Record<string, any> = {};
      for (const user of result) {
        chatUsers[user.id] = { ...user };
      }
      appStore.setValue(StoreEventsType.chatUsers, chatUsers);
    });
    //   .then(() =>
    //     new ChatsApi()
    //       .getChatUsersToken(chatInfo.id)
    //       .then((response: XMLHttpRequest) => JSON.parse(response.response))
    //       .catch((err: any) => console.error(err)),
    //   )
    //   .then(({ token }) => {
    //     if (this._userInfo) {
    //       return new WSClient(
    //         this._userInfo.id,
    //         chatInfo.id,
    //         token,
    //         (d) => console.log(d),
    //         //this.fetchChatMessageList.bind(this),
    //       );
    //     }
    //   });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
