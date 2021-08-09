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
  for: string;
  caption: string;
  class?: string;
};

const template = '{{ caption }}';

export default class Label extends BaseComponent {
  constructor(props: LabelProps) {
    super('label', {
      ...props,
      class: props.class || 'form-field__label',
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
