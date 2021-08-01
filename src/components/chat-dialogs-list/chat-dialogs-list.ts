import { compile, registerHelper } from "handlebars";
import BaseComponent from "../base-component";
import { ChatDialogItemProps } from "../chat-dialog-item/chat-dialog-item";
import template from "./chat-dialogs-list.tpl";

type ChatDialogsListProps = {
  dialogsList: Array<ChatDialogItemProps>;
};

export default class ChatDialogsList extends BaseComponent {
  constructor(props: ChatDialogsListProps) {
    super("ul", {
      ...props,
      class: "chats-list",
    });
  }
  render() {
    registerHelper("isdefined", (value) => !value);
    registerHelper(
      "dateToTimeString",
      (date: Date) => `${date.getHours()}:${(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()}`
    );
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
