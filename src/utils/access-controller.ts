import AuthApi from '../services/api/auth';
import appStore, { StoreEventsType } from '../services/store-manager';
import { UserResponse } from '../types';

class AccessController {
  userIsLoggined() {
    return new AuthApi()
      .userInfo()
      .then((resp: XMLHttpRequest): boolean => {
        if (resp.status === 401) {
          return false;
        }
        if (resp.status === 200) {
          const userInfo: UserResponse = JSON.parse(resp.response);
          appStore.setValue(StoreEventsType.currentUserInfo, userInfo);
          return true;
        }
        return false;
      })
      .catch((e): boolean => {
        if (e.status === 401) {
          return false;
        }
        return false;
      });
  }
}

export default new AccessController();
