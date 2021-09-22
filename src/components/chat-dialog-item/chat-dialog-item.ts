import { compile, registerHelper } from 'handlebars';
import BaseComponent from '../base-component';
import template from './chat-dialog-item.tpl';

export type ChatDialogItemProps = {
  selected: boolean;
  unreadMessages?: number;
  username: string;
  lastMessage: {
    text: string;
    time: Date;
  };
  avatarImgPath: string;
};

type Props = {
  id: 123;
  title: 'my-chat';
  avatar: '/123/avatar1.jpg';
  unread_count: 15;
  last_message: {
    user: {
      first_name: 'Petya';
      second_name: 'Pupkin';
      avatar: '/path/to/avatar.jpg';
      email: 'my@email.com';
      login: 'userLogin';
      phone: '8(911)-222-33-22';
    };
    time: '2020-01-02T14:22:22.000Z';
    content: 'this is message content';
  };
};

export default class ChatDialogItem extends BaseComponent {
  constructor(props: any) {
    super('li', { ...props });
  }

  render() {
    registerHelper('isdefined', (value) => !value);
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
