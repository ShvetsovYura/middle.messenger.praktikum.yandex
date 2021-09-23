import { compile } from 'handlebars';
import router from '../..';
import BaseComponent from '../../components/base-component';
import Button from '../../components/ui/button/button';
import template from './index.tpl';

export default class ErrorPage404 extends BaseComponent {
  constructor() {
    const backBUtton = new Button({
      caption: 'На главную',
      events: {
        click: () => router.go('/'),
      },
    });
    super('template', {
      children: {
        backBUtton,
      },
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
