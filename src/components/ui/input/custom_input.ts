import { compile } from 'handlebars';
import BaseComponent from '../../base-component';
import template from './input.tpl';

export type InputProps = {
  type?: 'text' | 'password' | 'number' | 'tel' | 'email';
  id: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  events?: Record<string, Function>;
  initValue?: string;
  className?: string;
  placeholder?: string;
};

export default class Input extends BaseComponent {
  constructor(props: InputProps) {
    super('input', {
      ...props,
      type: props.type || 'text',
      className: props.className || 'form-field__input',
    });
  }

  getValue() {
    return { [this.id]: 'hso' };
  }

  render() {
    const tpl = compile(template);
    return tpl(this.props);
  }
}
