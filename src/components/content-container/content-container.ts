import { compile } from 'handlebars';
import BaseComponent from '../base-component';
import CurrentChatHeader from '../current-chat-header/current-chat-header';
import CurrentChatMessagesContainer from '../messages-container/messages-container';
import SendMessagePanel from '../message-send-panel/message-send-panel';
import template from './content-container.tpl';

export default class ContentContainer extends BaseComponent {
  constructor() {
    super('template', {
      class: 'chat-messages-panel',
      children: {
        chatMessageHeader: new CurrentChatHeader({
          headerText: '',
        }),
        chatMessagesContainer: new CurrentChatMessagesContainer({
          messages: [],
        }),
        messageSentForm: new SendMessagePanel(),
      },
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
