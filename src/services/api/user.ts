import { UserInfo } from '../../pages/profile/profile-page';
import HTTPTransport from '../http-transport';

const host = 'https://ya-praktikum.tech';
const baseUrl = 'api/v2/user';
const httpClient = new HTTPTransport();

export default class UserApi {
  saveUserProfile(user: UserInfo) {
    return httpClient.put(`${host}/${baseUrl}/profile`, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      data: user,
    });
  }

  changeUserPassword(oldPassword: string, newPassword: string) {
    return httpClient.put(`${host}/${baseUrl}/password`, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      data: { oldPassword, newPassword },
    });
  }

  searchUser(login: string) {
    return httpClient.post(`${host}/${baseUrl}/search`, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      data: { login },
    });
  }
}
