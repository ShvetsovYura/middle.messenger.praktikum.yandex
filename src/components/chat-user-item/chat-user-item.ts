import { compile } from 'handlebars';
import BaseComponent from '../base-component';
import template from './chat-user-item.tpl';

export default class ChatUserItem extends BaseComponent {
  constructor(props: any) {
    super('template', {
      class: '_dsfsdf',
      //   children: {
      //     actionButton: () => {},
      //     userAvatar: () => {},
      //   },
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(null);
  }
}
