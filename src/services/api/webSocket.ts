export default class WSClient {
  private socket: WebSocket;

  static __instance: WSClient;

  callBack: (d: any) => [];

  constructor(userId?: number, chatId?: number, chatToken?: string, callBack?: (d: any) => []) {
    if (userId && chatId && chatToken) {
      this.socket?.close();
      this.socket = new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${chatToken}`,
      );
      this._registerEvents();
    }
    if (WSClient.__instance) {
      if (callBack) {
        this.callBack = callBack;
      }
      return WSClient.__instance;
    }

    WSClient.__instance = this;
    if (callBack) {
      this.callBack = callBack;
    }
  }

  private _registerEvents(): void {
    this.socket.addEventListener('open', this.open.bind(this));
    this.socket.addEventListener('message', this.message.bind(this));
    this.socket.addEventListener('error', this.error.bind(this));
    this.socket.addEventListener('close', this.close.bind(this));
  }

  open() {
    console.log('Соединение установлено');
    this.socket.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      }),
    );
  }

  send(message: string) {
    this.socket.send(
      JSON.stringify({
        content: message,
        type: 'message',
      }),
    );
  }

  message(event: Record<string, string>) {
    const data = JSON.parse(event.data);
    console.log('Получены данные', data);
    return this.callBack(data);
  }

  error(event: Record<string, string>) {
    console.log('Ошибка', event.message);
  }

  close(event: Record<string, string>) {
    if (event.wasClean) {
      console.log('Соединение закрыто успешно');
    } else {
      console.log('Соединение прервано');
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  }
}
