import { v4 as uuid } from 'uuid';

import { EventBus, IEventBus } from '../services/event-bus';

export default abstract class BaseComponent {
  private _props: Record<string, any>;

  private _tagName: string;

  private _element: HTMLElement;

  private _templateElement: HTMLTemplateElement;

  private _eventBus: () => IEventBus;

  private _id: string;

  static EVENTS = {
    INIT: 'flow:init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  constructor(tagName = 'template', props: Record<string, any> = {}) {
    this._tagName = tagName;
    const eventBus: IEventBus = new EventBus();
    this._id = uuid();
    this._eventBus = () => eventBus;
    this._props = this._makePropsProxy(props);

    this._registerEvents(eventBus);
    this._eventBus().emit(BaseComponent.EVENTS.INIT);
  }

  get element() {
    return this._element;
  }

  get props() {
    return this._props;
  }

  get id() {
    return this._id;
  }

  private _registerEvents(eventsBus: IEventBus) {
    eventsBus.on(BaseComponent.EVENTS.INIT, this.init.bind(this));
    eventsBus.on(BaseComponent.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventsBus.on(BaseComponent.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventsBus.on(BaseComponent.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _removeEvents(): void {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  private _addEvents(): void {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _render() {
    this._removeEvents();
    this._templateElement.innerHTML = this.render();
    const fragment = this._templateElement.content;
    const newElement = fragment.firstChild as HTMLElement;
    if (!this._element) {
      this._element = newElement;
    } else {
      this._element.replaceWith(newElement);
      this._element = newElement;
    }
    const { children = {} } = this.props;
    Object.keys(children).forEach((childKey) => {
      this._element
        .querySelector(`[data-tpl-key="${childKey}"`)
        ?.replaceWith(children[childKey].getContent());
    });
    this._addEvents();
  }

  private _makePropsProxy<T>(target: Record<string, T>): ProxyHandler<object> {
    return new Proxy(target, {
      get: (props, prop: string): T => {
        const value = props[prop];
        return typeof value === 'function' ? value.bind(props) : value;
      },
      set: (_target, prop: string, value: T): boolean => {
        target[prop] = value;
        this._eventBus().emit(BaseComponent.EVENTS.FLOW_CDU, { ..._target }, _target);
        return true;
      },
      deleteProperty: () => {
        throw new Error('?????? ??????????????');
      },
    });
  }

  private _componentDidUpdate(oldProps: any, newProps: any): void {
    const needUpdate: boolean = this.componentDidUpdate(oldProps, newProps);
    if (needUpdate) {
      this._eventBus().emit(BaseComponent.EVENTS.FLOW_RENDER, newProps);
    }
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    this._eventBus().emit(BaseComponent.EVENTS.FLOW_RENDER);
  }

  private _createResources(): void {
    this._templateElement = document.createElement(
      this._tagName === 'template' ? this._tagName : 'template',
    );
  }

  init() {
    this._createResources();
    this._eventBus().emit(BaseComponent.EVENTS.FLOW_CDM);
  }

  setProps = (nextProps: any) => {
    if (!nextProps) return;
    Object.assign(this._props, nextProps);
  };

  componentDidUpdate(oldProps: any, newProps: any) {
    return oldProps !== newProps;
  }

  abstract render(): string;

  componentDidMount(): void {}

  getContent() {
    return this._element;
  }

  show(rootQuerySelector: string = '#app'): void {
    const root = document.querySelector(rootQuerySelector);
    root?.append(this._element);
    this._eventBus().emit(BaseComponent.EVENTS.FLOW_RENDER);
  }

  hide() {
    this._element?.remove();
  }
}
