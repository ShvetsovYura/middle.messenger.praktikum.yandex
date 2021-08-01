import { compile } from "handlebars";
import BaseComponent from "../base-component";
import ChatHeader from "../chat-header/chat-header";
import MessagesContainer from "../messages-container/messages-container";
import SendMessageForm from "../send-message-form/send-message-form";
import template from "./chat-content-panel.tpl";

export default class ChatContentPanel extends BaseComponent {
  constructor(props: any) {
    super("div", {
      class: "chat-messages-panel",
      children: {
        chatMessageHeader: new ChatHeader({
          headerText: "Василий Петрович",
        }),
        chatMessagesContaier: new MessagesContainer({
          messages: props.messages,
        }),
        messageSentForm: new SendMessageForm(),
      },
    });
  }
  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
