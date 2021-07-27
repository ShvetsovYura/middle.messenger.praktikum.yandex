import { EventBus, IEventBus } from "../services/event-bus";

type Meta = {
  tagName: string;
  props: Record<string, any>;
};

export default abstract class BaseComponent {
  private _props: Record<string, any>;
  private _element: HTMLElement;
  private _meta: Meta;
  protected eventBus: () => IEventBus;

  static EVENTS = {
    INIT: "flow:init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  constructor(tagName = "div", props: Record<string, any> = {}) {
    const eventBus: IEventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };
    this.eventBus = () => eventBus;
    this._props = this._makePropsProxy(props);
    this._registerEvents(eventBus);
    this.eventBus().emit(BaseComponent.EVENTS.INIT);
  }

  get element() {
    return this._element;
  }

  get props() {
    return this._props;
  }

  get events() {
    return this.props.events;
  }

  private _registerEvents(eventsBus: IEventBus) {
    eventsBus.on(BaseComponent.EVENTS.INIT, this.init.bind(this));
    eventsBus.on(BaseComponent.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventsBus.on(BaseComponent.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventsBus.on(BaseComponent.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _removeEvents(): void {
    const { events = {} } = this._props;
    Object.keys(events).forEach((eventName) => this._element.removeEventListener(eventName, this.events[eventName]));
  }

  private _addEvents(): void {
    const { events = {} } = this._props;
    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  private _render() {
    console.log("start _render");
    this._removeEvents.call(this);
    const block = this.render();

    this._element.innerHTML = block;
    this._addEvents();
  }

  private _makePropsProxy<T>(target: Record<string, T>): ProxyHandler<object> {
    return new Proxy(target, {
      get: (target, prop: string): T => {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target, prop: string, value: T): boolean => {
        // console.log("proxy set called");
        target[prop] = value;
        this.eventBus().emit(BaseComponent.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error("Нет доступа");
      },
    });
  }

  private _componentDidUpdate(oldProps: any, newProps: any): void {
    // console.log("component did update call", this._element);
    const needUpdate: boolean = this.componentDidUpdate(oldProps, newProps);
    if (needUpdate) {
      // console.log("_componentDidUpdate need update?: ", needUpdate);
      this.eventBus().emit(BaseComponent.EVENTS.FLOW_RENDER, newProps);
    }
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    this.eventBus().emit(BaseComponent.EVENTS.FLOW_RENDER);
  }

  private _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(BaseComponent.EVENTS.FLOW_CDM);
  }

  setProps = (nextProps: any) => {
    // console.log("call setProps", nextProps);
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

  getEvents() {
    const { events = {} } = this._props;
    return events;
  }
  show() {
    this._element.style.display = "block";
  }

  hide() {
    this._element.style.display = "none";
  }
}
