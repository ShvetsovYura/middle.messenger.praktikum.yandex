import { compile } from 'handlebars';
import BaseComponent from '../base-component';
import template from './dialogs-list.tpl';

// @ts-ignore
import images from '../../../public/img/*.png';
import appStore, { StoreEventsType } from '../../services/store-manager';
import { ChatDialogCardProps, DialogCardItem } from '../dialog-card-item/dialog-card-item';

export type ChatDialogsListProps = {
  dialogsItems: Array<ChatDialogCardProps>;
};

export class DialogsList extends BaseComponent {
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
        [`dialog__${current.id}`]: new DialogCardItem({
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
    const tpl = compile(template);
    return tpl(this.props);
  }
}
