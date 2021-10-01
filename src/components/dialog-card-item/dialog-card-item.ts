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

export class DialogCardItem extends BaseComponent {
  constructor(props: ChatDialogCardProps) {
    super('template', { ...props });
  }

  render() {
    registerHelper('isdefined', (value) => !value);
    registerHelper('stringDateToTime', (dt: string) => {
      const date = new Date(dt);
      if (date) {
        return date.toLocaleString();
      }
      return '';
    });

    const tpl = compile(template);
    return tpl(this.props);
  }
}
