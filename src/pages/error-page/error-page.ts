import { compile } from 'handlebars';
import BaseComponent from '../../components/base-component';
import template from './error-page.tpl';

export type ErrorPageProps = {
  errorMessage: string;
  errorCode: string;
  backLink: string;
};

export default class ErrorPage extends BaseComponent {
  constructor(props: ErrorPageProps) {
    super('div', {
      ...props,
      class: 'error-page__container',
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
