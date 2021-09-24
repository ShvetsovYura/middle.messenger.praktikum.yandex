import { compile } from 'handlebars';
import BaseComponent from '../base-component';
import ChatHeader from '../current-chat-header/current-chat-header';
import MessagesContainer from '../messages-container/messages-container';
import SendMessageForm from '../message-send-form/message-send-form';
import template from './chat-content-panel.tpl';

export default class ChatContentPanel extends BaseComponent {
  constructor() {
    super('template', {
      class: 'chat-messages-panel',
      children: {
        chatMessageHeader: new ChatHeader({
          headerText: '',
        }),
        chatMessagesContainer: new MessagesContainer({
          messages: [],
        }),
        messageSentForm: new SendMessageForm(),
      },
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
