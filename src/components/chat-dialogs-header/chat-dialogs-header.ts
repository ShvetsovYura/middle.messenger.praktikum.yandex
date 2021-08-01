import { compile } from "handlebars";
import BaseComponent from "../base-component";
import TextLink from "../ui/text-link/text-link";
import template from "./chat-dialogs-header.tpl";

export default class ChatDialogsHeader extends BaseComponent {
  constructor(props: any) {
    super("div", {
      ...props,
      children: {
        profileLink: new TextLink({
          caption: "Профиль",
          href: "profile.html",
        }),
      },
    });
  }
  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
