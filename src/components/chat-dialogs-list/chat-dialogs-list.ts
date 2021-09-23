import { compile } from 'handlebars';
import BaseComponent from '../base-component';
import ChatDialogCard, { ChatDialogCardProps } from '../chat-dialog-item/chat-dialog-item';
import template from './chat-dialogs-list.tpl';
import images from '../../../public/img/*.png';

export type ChatDialogsListProps = {
  dialogsItems: Array<ChatDialogCardProps>;
};

export default class ChatDialogsList extends BaseComponent {
  constructor(props: ChatDialogsListProps) {
    super('template', {
      ...props,
      class: 'chats-list',
    });
  }

  constructDialogsList(chatDialogItems: ChatDialogCardProps[]) {
    const dialogsList = chatDialogItems.reduce(
      (agg, cur) => ({
        ...agg,
        [`${cur.title}___${cur.id}`]: new ChatDialogCard({
          ...cur,
          avatar: cur.avatar ?? images.img_avatar_min,
          events: {
            click: () => {
              this.props.onSelectDialogCard(cur);
              for (const el of Object.keys(this.props.children)) {
                this.props.children[el].setProps({ selected: false });
              }
              this.props.children[`${cur.title}___${cur.id}`].setProps({ selected: true });
            },
          },
        }),
      }),
      {},
    );

    this.setProps({ children: { ...dialogsList } });
  }

  componentDidMount() {
    this.constructDialogsList(this.props.dialogsItems);
  }

  render() {
    // registerHelper('isdefined', (value) => !value);
    // registerHelper(
    //   'dateToTimeString',
    //   (date: Date) =>
    //     `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`,
    // );
    const tpl = compile(template, { noEscape: true });
    const toRenderList = [];
    for (const el of Object.keys(this.props.children)) {
      toRenderList.push({ ...this.props.children[el].props });
    }
    return tpl(toRenderList);
  }
}
