import { compile } from 'handlebars';
import BaseComponent from '../base-component';
import ChatDialogCard, { ChatDialogCardProps } from '../dialog-card-item/dialog-card-item';
import template from './dialogs-list.tpl';

// @ts-ignore
import images from '../../../public/img/*.png';
import appStore, { StoreEventsType } from '../../services/store-manager';

export type ChatDialogsListProps = {
  dialogsItems: Array<ChatDialogCardProps>;
};

export default class DialogsList extends BaseComponent {
  constructor(props: ChatDialogsListProps) {
    super('template', {
      ...props,
      className: 'chats-list',
    });

    appStore.sub(StoreEventsType.dialogsList, this.constructDialogsList.bind(this));
  }

  constructDialogsList() {
    const dialogsList = appStore.getValue(StoreEventsType.dialogsList)?.reduce(
      (agg: any, current: any) => ({
        ...agg,
        [`dialog__${current.id}`]: new ChatDialogCard({
          ...current,
          avatar: current.avatar ?? images.img_avatar_min,
          events: {
            click: () => {
              for (const el of Object.keys(this.props.children)) {
                this.props.children[el].setProps({ selected: false });
              }
              this.props.children[`dialog__${current.id}`].setProps({ selected: true });
              appStore.setValue(StoreEventsType.activeDialog, current);
            },
          },
        }),
      }),
      {},
    );
    this.setProps({ children: { ...dialogsList } });
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    // const toRenderList = [];
    // if (this.props?.children) {
    //   for (const el of Object.keys(this.props?.children)) {
    //     toRenderList.push({ ...this.props.children[el].props });
    //   }
    // }
    return tpl(this.props);
  }
}
