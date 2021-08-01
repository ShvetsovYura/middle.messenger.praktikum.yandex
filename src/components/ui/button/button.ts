import { compile } from 'handlebars';
import BaseComponent from '../../base-component';

const template = '{{ caption }}';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  caption: string;
  events?: any;
  class?: string;
};

export default class Button extends BaseComponent {
  constructor(props: ButtonProps) {
    super('button', {
      ...props,
      class: props.class || 'form-field__submit form-field__submit_large',
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
