import { compile, registerHelper } from "handlebars";
import BaseComponent from "../base-component";
import { ChatMessageProps } from "../chat-message/chat-message";
import template from "./messages-container.tpl";

type MessagesContainerProps = {
  messages: Array<ChatMessageProps>;
};

export default class MessagesContainer extends BaseComponent {
  constructor(props: MessagesContainerProps) {
    super("div", {
      ...props,
      class: "chat-messages-container",
    });
  }
  render() {
    registerHelper(
      "dateToTimeString",
      (date: Date) => `${date.getHours()}:${(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()}`
    );
    const tpl = compile(template, { noEscape: true });
    return tpl({ messages: this.props.messages });
  }
}
