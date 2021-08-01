import { compile } from "handlebars";
import BaseComponent from "../../base-component";

export type LinkProps = {
  caption: string;
  href: string;
};
const template = `{{ caption }}`;

export default class TextLink extends BaseComponent {
  constructor(props: LinkProps) {
    super("a", props);
  }
  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
