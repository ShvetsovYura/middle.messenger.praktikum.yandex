import { compile } from 'handlebars';
import BaseComponent from '../../base-component';

const template = '<span class="{{className}}">{{ message }}</span>';
export default class InputErrrorMessage extends BaseComponent {
  constructor(props: any) {
    super('template', {
      ...props,
      className: 'form-field__error-message',
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
