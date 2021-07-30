import { compile } from "handlebars";
import BaseComponent from "../base-component";
import Button from "../ui/button/button";
import Input from "../ui/input/input";
import template from "./send-message-form.tpl";

export default class SendMessageForm extends BaseComponent {
  constructor() {
    super("form", {
      class: "message-form",
      children: {
        messageInput: new Input({
          id: "message",
          name: "message",
          type: "text",
          placeholder: "Введите сообщение...",
        }),
      },
      sendButton: new Button({
        class: "message-form__submit",
        caption: "Отправить",
        type: "submit",
      }),
    });
  }
  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(null);
  }
}
