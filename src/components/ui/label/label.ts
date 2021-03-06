import { compile } from 'handlebars';
import BaseComponent from '../../base-component';

export type InputProps = {
  type?: 'text' | 'password' | 'number';
  id: string;
  name: string;
  className?: string;
  isRequired?: boolean;
  events?: Record<string, Function>;
};

type LabelProps = {
  for?: string;
  caption: string;
  className?: string;
};

const template = '<label class="{{className}}" {{#if for}} for="{{for}}" {{/if}}>{{ caption }}</label>';

export default class Label extends BaseComponent {
  constructor(props: LabelProps) {
    super('template', {
      ...props,
      className: props.className || 'form-field__label',
    });
  }

  render() {
    const tpl = compile(template);
    return tpl(this.props);
  }
}
