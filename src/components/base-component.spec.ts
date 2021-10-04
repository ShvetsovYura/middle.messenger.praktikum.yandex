// eslint-disable-next-line max-classes-per-file
import { expect } from 'chai';
import { compile } from 'handlebars';
import BaseComponent from './base-component';

type TestComponentProps = {
  text: string;
  className: string;
  children?: any;
  events?: any;
};

const template = `<div class="{{className}}">
    <div data-tpl-key='childElement'></div>
    <div>{{text}}</div>
</div>
`;

const childTemplate = '<span class="{{className}}">{{text}}</span>';

class TestChildComponent extends BaseComponent {
  constructor(props: TestComponentProps) {
    super('template', { ...props });
  }

  render() {
    const tpl = compile(childTemplate);
    return tpl(this.props);
  }
}

class TestComponent extends BaseComponent {
  constructor(props: TestComponentProps) {
    super('template', { ...props });
  }

  render() {
    const tpl = compile(template);
    return tpl(this.props);
  }
}

describe('Тест элемента-блока', () => {
  const childElement = new TestChildComponent({
    className: 'child-className',
    text: 'childElement',
    events: {
      click: () => 'click event',
    },
  });

  const element = new TestComponent({
    className: 'test-component-container',
    text: 'innerData',
    children: {
      childElement,
    },
  });

  it('У родительского компонента должен быть класс', () => {
    expect(element.getContent().className).to.eq('test-component-container');
  });

  it('У родительского компонента должен быть правильный тэг', () => {
    expect(element.getContent().tagName.toLocaleLowerCase()).equal('div');
  });

  it('Дочерний элемент отрендерился в родительский', () => {
    const elementText = element.getContent().querySelector('.child-className')!;
    expect(elementText.outerHTML).equal('<span class="child-className">childElement</span>');

    expect(elementText.innerHTML).equal('childElement');
  });

  it('У дочернего компонента правильный тэг', () => {
    expect(childElement.element.tagName.toLocaleLowerCase()).equal('span');
  });

  it('У дочернего компонента есть события', () => {
    expect(element.props.children.childElement.props.events.click())
      .to.be.a('string')
      .and.to.eq('click event');
  });

  it('Изменеие пропсов', () => {
    element.setProps({ text: 'otherText' });
    expect(element.props.text).eq('otherText');
  });
});
