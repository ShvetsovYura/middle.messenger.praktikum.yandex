import { compile } from 'handlebars';
import { DialogMessage } from '../../types';
import BaseComponent from '../base-component';
import './message.less';
import template from './message.tpl';

export default class ChatMessage extends BaseComponent {
  constructor(props: DialogMessage) {
    super('template', props);
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
