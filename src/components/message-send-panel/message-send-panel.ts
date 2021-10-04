import { compile } from 'handlebars';
import BaseComponent from '../base-component';
import Button from '../ui/button/button';
import Input from '../ui/input';
import './message-send-panel.less';
import template from './message-send-panel.tpl';
import fnc from '../../utils/helpers/help-functions';

export type SendMessageProps = {
  onSendMessage: (message: string | null) => void;
};

export class SendMessagePanel extends BaseComponent {
  constructor(props: SendMessageProps) {
    super('template', {
      ...props,
      className: 'message-send-panel',
      children: {
        messageInput: new Input({
          id: 'message',
          name: 'message',
          type: 'text',
          className: 'send-message-input',
          autocomplete: 'off',
          placeholder: 'Введите сообщение...',
        }),
        sendButton: new Button({
          className: 'message-form__submit',
          isIcon: true,
          caption: 'send',
          type: 'submit',
        }),
      },
      events: {
        submit: (e: Event) => this.messageSubmit(e),
      },
    });
  }

  messageSubmit(e: Event) {
    e.preventDefault();

    const { messageInput } = this.props.children;
    const { id } = messageInput.props;

    const element = document.querySelector(`#${id}`);
    let value: string | null = null;
    if (element) {
      const el = element as HTMLInputElement;
      value = el.value;
    }

    if (value) {
      this.props.onSendMessage(fnc.sanitize(value));
    }
    this.props.children.messageInput.setProps({ value: '' });
  }

  render() {
    const tpl = compile(template);
    return tpl(this.props);
  }
}
