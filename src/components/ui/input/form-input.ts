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
  className?: string;
  placeholder?: string;
  value?: string;
  autocomplete?: 'on' | 'off';
};

export class FormInput extends BaseComponent {
  constructor(props: InputProps) {
    super('template', {
      ...props,
      type: props.type || 'text',
      autocomplete: props.autocomplete || 'off',
      className: props.className || 'form-field__input',
    });
  }

  getValue() {
    return this.props.value;
  }

  render() {
    const tpl = compile(template);
    return tpl(this.props);
  }
}
