import { compile } from 'handlebars';
import appStore, { StoreEventsType } from '../../services/store-manager';
import { DialogMessage } from '../../types';
import BaseComponent from '../base-component';
import ChatMessage from '../message/message';
import './messages-list.less';
import template from './messages-list.tpl';

export default class MessagesList extends BaseComponent {
  constructor(props: any) {
    super('template', {
      ...props,
      className: 'messages-list',
    });

    appStore.sub(StoreEventsType.dialogMessages, this.handleReceiveMessages.bind(this));
  }

  private handleReceiveMessages() {
    console.log('received messages', appStore.getValue(StoreEventsType.dialogMessages));

    const messagesList = appStore.getValue(StoreEventsType.dialogMessages)?.reduce(
      (agg: Record<string, DialogMessage>, message: DialogMessage) => ({
        ...agg,
        [`message__${message.id}`]: new ChatMessage(message),
      }),
      {},
    );
    this.setProps({ children: { ...messagesList } });
  }

  render() {
    const activeDialog = appStore.getValue(StoreEventsType.activeDialog);
    console.log('is selected dialog', activeDialog !== undefined && activeDialog !== null);
    const data = {
      props: this.props,
      dialogIsSelected: activeDialog !== undefined && activeDialog !== null,
    };
    const tpl = compile(template, { noEscape: true });
    return tpl({ data });
  }
}
