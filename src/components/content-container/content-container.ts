import { compile } from 'handlebars';
import BaseComponent from '../base-component';
import CurrentChatHeader from '../current-chat-header';
import SendMessagePanel from '../message-send-panel';
import { SendMessageProps } from '../message-send-panel/message-send-panel';
import CurrentChatMessagesContainer from '../messages-container';
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
