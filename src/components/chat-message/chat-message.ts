import { compile } from "handlebars";
import BaseComponent from "../base-component";
import template from "./chat-message.tpl";

type ChatMessageProps = {
  message: string;
  own: boolean;
  status: "pending" | "sended" | "reading";
  time: string;
};

export default class ChatMessage extends BaseComponent {
  constructor(props: ChatMessageProps) {
    super("div", props);
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
