import { compile } from 'handlebars';
import BaseComponent from '../../components/base-component';
import ChatContentPanel from '../../components/chat-content-panel/chat-content-panel';
import ChatDialogsPanel, { ChatDialogsPanelProps } from '../../components/chat-dialogs-panel/chat-dialogs-panel';
import { MessagesContainerProps } from '../../components/messages-container/messages-container';
import template from './chat-page.tpl';

export type ChatPageProps = ChatDialogsPanelProps & MessagesContainerProps;

export default class ChatPage extends BaseComponent {
  constructor(props: ChatPageProps) {
    super('main', {
      ...props,
      class: 'chat-main',
      children: {
        chatDialogsPanel: new ChatDialogsPanel({ dialogs: props.dialogs }),
        chatContentPanel: new ChatContentPanel({ messages: props.messages }),
      },
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
