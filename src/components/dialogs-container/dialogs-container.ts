import { compile } from 'handlebars';
import BaseComponent from '../base-component';
// import ChatDialogsHeader from '../chat-dialogs-header/chat-dialogs-header';
import ChatDialogsList from '../chat-dialogs-list/chat-dialogs-list';
import './dialogs-container.less';
import template from './dialogs-container.tpl';

export type ChatDialogsPanelProps = {
  dialogs: Array<ChatDialogItemProps>;
};

export default class DialogsContainer extends BaseComponent {
  constructor(props: any) {
    const dialogsList = new ChatDialogsList({
      dialogsItems: props.dialogs,
    });
    super('aside', {
      class: 'side-panel',
      children: {
        //   // dialogsHeader: new ChFatDialogsHeader({}),
        dialogsList,
      },
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
