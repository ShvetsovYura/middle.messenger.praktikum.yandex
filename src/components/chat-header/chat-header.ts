import { compile } from "handlebars";
import BaseComponent from "../base-component";
import template from "./chat-header.tpl";

type HeaderProps = {
  headerText: string;
};

export default class ChatHeader extends BaseComponent {
  constructor(props: HeaderProps) {
    super("div", props);
  }
  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
