import { EventBus, IEventBus } from "../services/event-bus";
import { v4 as uuid } from "uuid";
type Meta = {
  tagName: string;
  props: Record<string, any>;
};

const listPropsAsAttribute: string[] = ["for", "class", "value", "type", "id", "name"];

function keyInObject<T>(key: any, object: T): key is keyof T {
  return key in object;
}

export default abstract class BaseComponent {
  private _props: Record<string, any>;
  private _element: HTMLElement;
  private _meta: Meta;
  private _eventBus: () => IEventBus;
  private _id: string;

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
    this._id = uuid();
    this._eventBus = () => eventBus;
    this._props = this._makePropsProxy(props);

    this._registerEvents(eventBus);
    this._eventBus().emit(BaseComponent.EVENTS.INIT);

    this._removeEvents = this._removeEvents.bind(this);
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
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  private _addEvents(): void {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  private _render() {
    this._removeEvents();
    const block = this.render();
    this._element.innerHTML = block;

    const { children = {} } = this.props;
    Object.keys(children).forEach((childKey) => {
      this._element.querySelector(`[data-tpl-key="${childKey}"`)?.replaceWith(children[childKey].getContent());
    });
    Object.keys(this.props).forEach((propName) => {
      if (listPropsAsAttribute.includes(propName)) {
        this._element.setAttribute(propName, this.props[propName]);
      }
      if (propName === "disabled") {
        if (!!this.props[propName]) {
          this._element.setAttribute("disabled", "disabled");
        } else {
          this._element.removeAttribute("disabled");
        }
      }

      if (propName === "required") {
        if (!!this.props[propName]) {
          this._element.setAttribute("required", "required");
        } else {
          this._element.removeAttribute("required");
        }
      }
    });
    // this._setAttributes(this._attributes);

    this._addEvents();
  }

  private _makePropsProxy<T>(target: Record<string, T>): ProxyHandler<object> {
    return new Proxy(target, {
      get: (target, prop: string): T => {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target, prop: string, value: T): boolean => {
        target[prop] = value;
        this._eventBus().emit(BaseComponent.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error("Нет доступа");
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
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
    this._element.setAttribute("data-id", this._id);
  }

  _setAttributes(attributes: Record<string, any>) {
    Object.keys(attributes).forEach((attribute) => this._element.setAttribute(attribute, attributes[attribute]));
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
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

  show() {
    this._element.style.display = "block";
  }

  hide() {
    this._element.style.display = "none";
  }
}
