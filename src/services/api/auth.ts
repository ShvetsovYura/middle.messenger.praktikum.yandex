import { UserInfo } from '../../pages/profile/profile-page';
import HTTPTransport from '../http-transport';

const host = 'https://ya-praktikum.tech';
const baseUrl = 'api/v2/auth';
const httpClient = new HTTPTransport();

export default class AuthApi {
  signUp(userData: UserInfo) {
    return httpClient.post(`${host}/${baseUrl}/signup`, {
      data: { ...userData },
    });
  }

  signIn(login: string, password: string) {
    return httpClient.post(`${host}/${baseUrl}/signin`, {
      data: { login, password },
    });
  }

  logOut() {
    return httpClient.post(`${host}/${baseUrl}/logout`);
  }

  userInfo() {
    return httpClient.get(`${host}/${baseUrl}/user`);
  }
}
