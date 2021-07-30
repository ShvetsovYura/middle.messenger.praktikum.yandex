import { compile } from "handlebars";
import BaseComponent from "../../components/base-component";
import ChatMessagesPanel from "../../components/messages-container/messages-container";
import template from "./chat-page.tpl";

export default class ChatPage extends BaseComponent {
  constructor(props: any) {
    super("main", {
      ...props,
      class: "chat-main",
      children: {
        chatMessagesPanel: new ChatMessagesPanel(props.messages),
      },
    });
  }
  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
