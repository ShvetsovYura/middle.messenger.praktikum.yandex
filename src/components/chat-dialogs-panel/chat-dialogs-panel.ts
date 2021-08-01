import { compile } from "handlebars";
import BaseComponent from "../base-component";
import ChatDialogsHeader from "../chat-dialogs-header/chat-dialogs-header";
import ChatDialogsList from "../chat-dialogs-list/chat-dialogs-list";
import template from "./chat-dialogs-panel.tpl";
import { ChatDialogItemProps } from "../chat-dialog-item/chat-dialog-item";

export type ChatDialogsPanelProps = {
  dialogs: Array<ChatDialogItemProps>;
};

export default class ChatDialogsPanel extends BaseComponent {
  constructor(props: ChatDialogsPanelProps) {
    super("aside", {
      class: "side-panel",
      children: {
        dialogsHeader: new ChatDialogsHeader({}),
        dialogsList: new ChatDialogsList({
          dialogsList: props.dialogs,
        }),
      },
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}