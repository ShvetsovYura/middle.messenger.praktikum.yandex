import HTTPTransport from '../HttpTransport';

const host = 'https://ya-praktikum.tech';
const baseUrl = 'api/v2/chats';
const httpClient = new HTTPTransport();

export default class ChatsApi {
  chatsList() {
    return httpClient.get(`${host}/${baseUrl}`);
  }

  createChat(title: string) {
    return httpClient.post(`${host}/${baseUrl}`, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      data: { title },
    });
  }

  chatUsers(id: number) {
    return httpClient.get(`${host}/${baseUrl}/${id}/users`, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    });
  }

  getChatToken(chatId: number) {
    return httpClient.post(`${host}/${baseUrl}/token/${chatId}`);
  }
}
