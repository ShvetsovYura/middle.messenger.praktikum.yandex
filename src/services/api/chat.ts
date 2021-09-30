import HTTPTransport from '../http-transport';
import { UsersRequest } from './types';

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

  removeUsers(users: UsersRequest) {
    return httpClient.delete(`${host}/${baseUrl}/users`, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      data: users,
    });
  }

  addUsers(users: UsersRequest) {
    return httpClient.put(`${host}/${baseUrl}/users`, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      data: users,
    });
  }

  getChatToken(chatId: number) {
    return httpClient.post(`${host}/${baseUrl}/token/${chatId}`);
  }
}
