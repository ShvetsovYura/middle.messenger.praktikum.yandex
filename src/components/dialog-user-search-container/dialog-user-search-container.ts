import { compile } from 'handlebars';
import UserApi from '../../services/api/user';
import appStore, { StoreEventsType } from '../../services/store-manager';
import BaseComponent from '../base-component';
import DialogUserSearchResultContainer from '../dialog-users-search-result-container';
import Button from '../ui/button/button';
import Input from '../ui/input';
import './dialog-user-search-container.less';
import template from './dialog-user-search-container.tpl';

export default class DialogUserSearchContainer extends BaseComponent {
  constructor() {
    super('template', {
      className: 'current-dialog-users-list-panel',
      children: {
        findUsersInput: new Input({
          id: 'searchUser',
          name: 'searchUser ',
        }),
        findUsersButton: new Button({
          type: 'button',
          caption: 'Найти',
          events: {
            click: () => {
              const { value } = this.props.children.findUsersInput.element;
              new UserApi().searchUser(value).then((resp: XMLHttpRequest) => {
                appStore.setValue(StoreEventsType.dialogUserSearchResult, []);
                appStore.setValue(
                  StoreEventsType.dialogUserSearchResult,
                  JSON.parse(resp.response),
                );
              });
            },
          },
        }),

        searchResult: new DialogUserSearchResultContainer(),
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
