import { compile } from 'handlebars';
import BaseComponent from '../base-component';
import Button from '../ui/button/button';
import Input from '../ui/input';
import './message-send-panel.less';
import template from './message-send-panel.tpl';

export default class SendMessagePanel extends BaseComponent {
  constructor() {
    super('template', {
      className: 'message-send-panel',
      children: {
        messageInput: new Input({
          id: 'message',
          name: 'message',
          type: 'text',
          placeholder: 'Введите сообщение...',
        }),
        sendButton: new Button({
          class: 'message-form__submit',
          caption: 'Отправить',
          type: 'submit',
        }),
      },
      events: {
        submit: (e: Event) => this.messageSubmit(e),
      },
    });
  }

  messageSubmit(e: any) {
    e.preventDefault();
    const { messageInput } = this.props.children;
    const { id, name } = messageInput.props;

    const element = document.querySelector(`#${id}`);
    let value: string;
    if (element) {
      const el = element as HTMLInputElement;
      value = el.value;
    } else {
      return;
    }
    if (value === '') {
      return;
    }
    console.log({ [name]: value });

    if (element) {
      const el = element as HTMLInputElement;
      value = el.value;
    }
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}