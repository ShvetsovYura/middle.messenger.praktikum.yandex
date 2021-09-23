import { compile, registerHelper } from 'handlebars';
import BaseComponent from '../base-component';
import template from './chat-dialog-item.tpl';

export type LastMessageDialogCardProps = {
  user?: LastMessageUserDialogCardProps;
  time: string;
  content: string;
};

export type LastMessageUserDialogCardProps = {
  first_name: string;
  second_name: string;
  avatar: string;
  email: string;
  login: string;
  phone: string;
};

export type ChatDialogCardProps = {
  id: number;
  title: string;
  avatar?: string;
  unread_count: number;
  last_message?: LastMessageDialogCardProps;
  events?: any;
};

export default class ChatDialogCard extends BaseComponent {
  constructor(props: ChatDialogCardProps) {
    super('template', { ...props });
  }

  render() {
    registerHelper('isdefined', (value) => !value);
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
