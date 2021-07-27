import { compile } from "handlebars";
import BaseComponent from "../components/base-component";
import Button from "../components/ui/button/button";

export interface IRenderable {
  render: () => string;
}

const template = `
<div>
    {{ input }}
    {{ button }}
</div>
`;

export default class LoginPage extends BaseComponent implements IRenderable {
  constructor() {
    console.log("call constructor LoginPage");
    super("div", {
      button: new Button({
        type: "button",
        caption: "mybutton",
        events: {
          click: function () {
            alert("click!");
          },
        },
      }),
    });
  }

  render() {
    console.log("render LoginPage");
    const tpl = compile(template, { noEscape: true });

    return tpl({ button: this.props.button.render() });
  }
}
