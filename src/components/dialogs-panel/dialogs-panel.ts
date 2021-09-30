import { compile } from 'handlebars';
import BaseComponent from '../base-component';
import DialogsList from '../dialogs-list/dialogs-list';
import DialogsPanelHeader from '../dialogs-panel-header/dialogs-panel-header';
import './dialogs-panel.less';
import template from './dialogs-panel.tpl';

export default class DialogsPanel extends BaseComponent {
  constructor(props: any) {
    super('aside', {
      class: 'side-panel',
      children: {
        dialogsPanelHeader: new DialogsPanelHeader({}),
        dialogsList: new DialogsList({
          dialogsItems: props.dialogs,
        }),
      },
    });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
