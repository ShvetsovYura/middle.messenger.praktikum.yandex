import { compile } from 'handlebars';
import BaseComponent from '../../components/base-component';
import ChatDialogsList from '../../components/dialogs-list/dialogs-list';
import template from './test.tpl';

export default class TestPage extends BaseComponent {
  constructor(props: any) {
    super('template', {
      ...props,
      children: {
        chatCardList: new ChatDialogsList({ dialogsItems: chatItems }),
      },
    });
  }

  // componentDidMount() {
  //   const dialogsLilst = chatItems.reduce(
  //     (agg, cur) => ({
  //       ...agg,
  //       [`${cur.title}___${cur.id}`]: new ChatDialogItem({
  //         ...cur,
  //         events: {
  //           click: () => this.props.children[cur.title].setProps({ selected: true }),
  //         },
  //       }),
  //     }),
  //     {},
  //   );
  //   this.setProps({ children: { ...dialogsLilst } });
  // }

  render() {
    const tpl = compile(template, { noEscape: true });

    return tpl(this.props);
  }
}
