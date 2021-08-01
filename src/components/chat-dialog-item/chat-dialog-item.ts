import { compile, registerHelper } from "handlebars";
import BaseComponent from "../base-component";
import template from "./chat-dialog-item.tpl";

export type ChatDialogItemProps = {
  selected: boolean;
  unreadMessages?: number;
  username: string;
  lastMessage: {
    text: string;
    time: Date;
  };
  avatarImgPath: string;
};

export default class ChatDialogItem extends BaseComponent {
  constructor(props: ChatDialogItemProps) {
    super("li", props);
  }
  render() {
    registerHelper("isdefined", (value) => !value);
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
