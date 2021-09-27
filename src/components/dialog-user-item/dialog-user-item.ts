import { compile } from 'handlebars';
import BaseComponent from '../base-component';
import './dialog-user-item.less';
import template from './dialog-user-item.tpl';

export default class DialogUserItem extends BaseComponent {
  constructor(props: any) {
    super('template', {
      ...props,
      class: 'dialog-user-item',
      //   children: {
      //     actionButton: () => {},
      //     userAvatar: () => {},
      //   },
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
