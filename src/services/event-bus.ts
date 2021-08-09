export interface IEventBus {
  on: (event: string, callback: Function) => void;
  off: (event: string, callback: Function) => void;
  emit: (event: string, ...args: any) => void;
}

export class EventBus implements IEventBus {
  private listeners: Record<string, Function[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: Function) {
    if (!this.listeners[event]) {
      throw new Error(`Событие ${event} не найдено`);
    }
    this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
  }

  emit(event: string, ...args: any) {
    if (!this.listeners[event]) {
      throw new Error(`Событие ${event} не найдено`);
    }
    this.listeners[event].forEach((cb) => cb(...args));
  }
}
