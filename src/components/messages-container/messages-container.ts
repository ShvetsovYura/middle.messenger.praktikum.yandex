import { compile, registerHelper } from 'handlebars';
import BaseComponent from '../base-component';
import ChatUsersList from '../chat-users-list/chat-users-list';
import './messages-container.less';
import template from './messages-container.tpl';

export default class CurrentChatMessagesContainer extends BaseComponent {
  constructor(props: any) {
    super('template', {
      className: 'current-dialog-messages-list',
      children: {
        //   messagesList:()=>{},
        usersList: new ChatUsersList({}),
      },
    });
  }

  render() {
    registerHelper(
      'dateToTimeString',
      (date: Date) =>
        `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`,
    );
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
