import { UserInfo } from '../../pages/profile/profile-page';
import HTTPTransport from '../HttpTransport';

const host = 'https://ya-praktikum.tech';
const baseUrl = 'api/v2/auth';
const httpClient = new HTTPTransport();

export default class AuthApi {
  signUp(userData: UserInfo) {
    return httpClient.post(`${host}/${baseUrl}/signup`, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      data: { ...userData },
    });
  }

  signIn(login: string, password: string) {
    return httpClient.post(`${host}/${baseUrl}/signin`, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      data: { login, password },
    });
  }

  logOut() {
    return httpClient.post(`${host}/${baseUrl}/logout`, {
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  userInfo() {
    return httpClient.get(`${host}/${baseUrl}/user`);
  }
}
