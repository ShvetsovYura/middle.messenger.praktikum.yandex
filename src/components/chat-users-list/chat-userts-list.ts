import { compile, registerHelper } from 'handlebars';
import BaseComponent from '../base-component';
import { ChatMessageProps } from '../chat-message/chat-message';
import './messages-container.less';
import template from './messages-container.tpl';

export default class MessagesContainer extends BaseComponent {
  constructor(props: MessagesContainerProps) {
    super('template', {
      class: 'messages-container',
      //   children:{
      //     messagesList:()=>{},
      //     usersList:()=>{}
      //   }
    });
  }

  render() {
    registerHelper(
      'dateToTimeString',
      (date: Date) =>
        `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`,
    );
    const tpl = compile(template, { noEscape: true });
    return tpl({ messages: this.props.messages });
  }
}
