import { EventBus } from './event-bus';

export enum StoreEventsType {
  dialogsList = '__dialogsList',
  activeDialog = '__activeDialog',
  chatUsers = '__chatUsers',
  usersListIsOpen = '__usersListIsOpen',
  currentUserInfo = '__currentUserInfo',
  dialogMessages = '__dialogMessages',
  dialogUserSearchResult = '__dialogUserSearchResult',
}

class StoreManager {
  private static __instance: StoreManager;

  private _storeData: Record<string, any> = {};

  private _storeProxy: any;

  private _eventBus = new EventBus();

  constructor() {
    if (StoreManager.__instance) {
      return StoreManager.__instance;
    }

    this._storeProxy = new Proxy(this._storeData, {
      get: (target, prop: string) => target[prop],
      set: (target, propName: string, value: any) => {
        target[propName] = value;
        if (this._eventBus.listeners[propName]) {
          this._eventBus.emit(propName, value);
        }
        return true;
      },
    });

    StoreManager.__instance = this;
  }

  public setValue(propName: string, value: any): void {
    this._storeProxy[propName] = value;
  }

  public getValue(propName: string): any {
    return this._storeProxy[propName];
  }

  public concatenateArraysValues(propName: string, value: any) {
    let currentValue = this.getValue(propName);

    if (typeof currentValue === 'undefined' || currentValue === null) {
      currentValue = [];
    }

    const freshValues = Array.isArray(value) ? value : [value];
    this._storeProxy[propName] = [...currentValue, ...freshValues];
  }

  public sub(propName: string, callback: Function) {
    this._eventBus.on(propName, callback);
  }

  public unsub(propName: string, callback: Function) {
    this._eventBus.off(propName, callback);
  }
}
const appStore = new StoreManager();

export default appStore;
