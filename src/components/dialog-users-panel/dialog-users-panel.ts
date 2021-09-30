import { compile } from 'handlebars';
import appStore, { StoreEventsType } from '../../services/store-manager';
import BaseComponent from '../base-component';
import DialogUserSearchContainer from '../dialog-user-search-container';
import CurrentDialogUsersList from '../dialog-users-list';
import './dialog-users-panel.less';
import template from './dialog-users-panel.tpl';

export default class CurrentDialogUsersPanel extends BaseComponent {
  constructor() {
    super('template', {
      className: 'current-dialog-users-list-panel',
      children: {
        searchUsersContainer: new DialogUserSearchContainer(),
        currentDialogUsers: new CurrentDialogUsersList(),
      },
    });

    appStore.sub(StoreEventsType.usersListIsOpen, this._toggle.bind(this));
  }

  private _toggle() {
    const isOpen = appStore.getValue(StoreEventsType.usersListIsOpen);
    this.setProps({ isOpen });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
