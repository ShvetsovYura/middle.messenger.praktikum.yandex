import { compile } from 'handlebars';
import appStore, { StoreEventsType } from '../../services/store-manager';
import BaseComponent from '../base-component';
import './current-chat-header.less';
import template from './current-chat-header.tpl';

type HeaderProps = {
  headerText: string;
};

export default class ChatHeader extends BaseComponent {
  constructor(props: HeaderProps) {
    super('template', props);
    appStore.sub(StoreEventsType.activeDialog, this.handleChangeActiveDialog.bind(this));
  }

  private handleChangeActiveDialog(dialogInfo: any) {
    this.setProps({ headerText: dialogInfo.title });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
