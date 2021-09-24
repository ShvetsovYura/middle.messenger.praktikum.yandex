import { compile } from 'handlebars';
import appStore, { StoreEventsType } from '../../services/store-manager';
import BaseComponent from '../base-component';
import './chat-users-list.less';
import template from './chat-users-list.tpl';

export default class ChatUsersList extends BaseComponent {
  constructor(props: any) {
    super('template', {
      className: 'users-list-panel',
      //   children:{
      //     messagesList:()=>{},
      //     usersList:()=>{}
      //   }
    });

    appStore.sub(StoreEventsType.usersListIsOpen, this._toggle.bind(this));
  }

  private _toggle() {
    if (appStore.getValue(StoreEventsType.usersListIsOpen)) {
      this.element.classList.add('users-list-panel--show');
    } else {
      this.element.classList.remove('users-list-panel--show');
    }
  }

  render() {
    // registerHelper(
    //   'dateToTimeString',
    //   (date: Date) =>
    //     `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`,
    // );
    const tpl = compile(template, { noEscape: true });
    return tpl(this.props);
  }
}
