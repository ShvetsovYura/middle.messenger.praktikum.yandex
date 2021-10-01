import { compile } from 'handlebars';
import BaseComponent from '../base-component';
import CurrentChatHeader from '../current-chat-header/current-chat-header';
import CurrentChatMessagesContainer from '../messages-container/messages-container';
import SendMessagePanel, { SendMessageProps } from '../message-send-panel/message-send-panel';
import template from './content-container.tpl';

export class ContentContainer extends BaseComponent {
  constructor(props: SendMessageProps) {
    super('template', {
      ...props,
      class: 'chat-messages-panel',
      children: {
        chatMessageHeader: new CurrentChatHeader({
          headerText: '',
        }),
        chatMessagesContainer: new CurrentChatMessagesContainer(),
        messageSentForm: new SendMessagePanel({ ...props }),
      },
    });
  }

  render() {
    const tpl = compile(template);
    return tpl(this.props);
  }
}
