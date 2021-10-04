import { compile } from 'handlebars';
import BaseComponent from '../base-component';
import DialogsList from '../dialogs-list';
import DialogsPanelHeader from '../dialogs-panel-header';
import './dialogs-panel.less';
import template from './dialogs-panel.tpl';

export class DialogsPanel extends BaseComponent {
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
    const tpl = compile(template);
    return tpl(this.props);
  }
}
