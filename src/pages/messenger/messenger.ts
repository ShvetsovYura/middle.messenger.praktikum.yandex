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
          onSelectDialogCard: (chatInfo: any) => {
            this.props.children.chatContentPanel.props.children.chatMessageHeader.setProps({
              headerText: chatInfo.title,
            });
            this._acitveDialog = chatInfo.id;
            this._messages = [];
            this._chatUsers = {};
            new ChatsApi()
              .chatUsers(chatInfo.id)
              .then((response: XMLHttpRequest) => {
                const result: Array<UserResponse> = JSON.parse(response.response);
                for (const user of result) {
                  if (this._chatUsers) {
                    this._chatUsers[user.id] = { ...user };
                  }
                }
              })
              .then(() =>
                new ChatsApi()
                  .getChatUsersToken(chatInfo.id)
                  .then((response: XMLHttpRequest) => JSON.parse(response.response))
                  .catch((err: any) => console.error(err)),
              )
              .then(({ token }) => {
                if (this._userInfo) {
                  return new WSClient(
                    this._userInfo.id,
                    chatInfo.id,
                    token,
                    (d) => console.log(d),
                    //this.fetchChatMessageList.bind(this),
                  );
                }
              });
          },
        }),
        chatContentPanel,
      },
    });
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
    new ChatsApi().chatsList().then((response: XMLHttpRequest) => {
      chatsList = JSON.parse(response.response);
      this.props.children.chatDialogsPanel.props.children.dialogsList.constructDialogsList(
        chatsList,
      );
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
