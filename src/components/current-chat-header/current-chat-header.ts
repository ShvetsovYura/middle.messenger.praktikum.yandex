import { compile } from 'handlebars';
import appStore, { StoreEventsType } from '../../services/store-manager';
import BaseComponent from '../base-component';
import Button from '../ui/button/button';
import './current-chat-header.less';
import template from './current-chat-header.tpl';

type HeaderProps = {
  headerText: string;
};

export default class CurrentChatHeader extends BaseComponent {
  constructor(props: HeaderProps) {
    super('template', {
      ...props,
      children: {
        showUsersPanelButton: new Button({
          caption: 'people',
          isIcon: true,
          disabled: true,
          events: {
            click: () => {
              const val = appStore.getValue(StoreEventsType.usersListIsOpen);
              const needOpen = val === undefined || val === false;
              appStore.setValue(StoreEventsType.usersListIsOpen, needOpen);
            },
          },
        }),
      },
    });
    appStore.sub(StoreEventsType.activeDialog, this.handleChangeActiveDialog.bind(this));
  }

  private handleChangeActiveDialog(dialogInfo: any) {
    this.setProps({ headerText: dialogInfo.title });
    this.props.children.showUsersPanelButton.setProps({ disabled: false });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
