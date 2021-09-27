import { compile, registerHelper } from 'handlebars';
import BaseComponent from '../base-component';
import './dialog-card-item.less';
import template from './dialog-card-item.tpl';

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

export default class DialogCardItem extends BaseComponent {
  constructor(props: ChatDialogCardProps) {
    super('template', { ...props });
  }

  render() {
    registerHelper('isdefined', (value) => !value);
    registerHelper('stringDateToTime', (dt: string) => {
      const date = new Date(dt);
      if (date) {
        return date.toLocaleString();
        // return `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
      }
      return '';
    });

    const tpl = compile(template, { noEscape: true });
    const { title, content, avatar, last_message, unread_count } = this.props;
    console.log('props', unread_count);
    return tpl({ title, content, avatar, last_message, unread_count });
  }
}
