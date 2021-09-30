import { compile } from 'handlebars';
import BaseComponent from '../base-component';
import MessagesList from '../messages-list';
import './messages-container.less';
import template from './messages-container.tpl';

export default class CurrentChatMessagesContainer extends BaseComponent {
  constructor() {
    super('template', {
      className: 'current-dialog-messages-list',
      children: {
        messagesList: new MessagesList({}),
      },
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
