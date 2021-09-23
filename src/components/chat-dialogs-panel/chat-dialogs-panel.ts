import { compile } from 'handlebars';
import BaseComponent from '../base-component';
// import ChatDialogsHeader from '../chat-dialogs-header/chat-dialogs-header';
import ChatDialogsList from '../chat-dialogs-list/chat-dialogs-list';
import template from './chat-dialogs-panel.tpl';

export type ChatDialogsPanelProps = {
  dialogs: Array<ChatDialogItemProps>;
  onSelect: any;
};

export default class ChatDialogsPanel extends BaseComponent {
  constructor(props: any) {
    const dialogsList = new ChatDialogsList({
      dialogsItems: props.dialogs,
      onSelectDialogCard: props.onSelectDialogCard,
    });
    super('aside', {
      class: 'side-panel',
      children: {
        // dialogsHeader: new ChFatDialogsHeader({}),
        dialogsList,
      },
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
