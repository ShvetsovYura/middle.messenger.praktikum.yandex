import { compile } from 'handlebars';
import BaseComponent from '../../base-component';
import template from './button.tpl';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  caption: string;
  events?: Record<string, Function>;
  disabled?: boolean;
  className?: string;
};

export default class Button extends BaseComponent {
  constructor(props: ButtonProps) {
    super('template', {
      ...props,
      className: props.className || 'form-field__submit form-field__submit_large',
      type: props.type || 'button',
    });
  }

  componentDidMount() {
    setTimeout(() => this.setProps({ caption: 'meme' }), 2000);
    setTimeout(() => this.setProps({ disabled: true }), 3000);
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
