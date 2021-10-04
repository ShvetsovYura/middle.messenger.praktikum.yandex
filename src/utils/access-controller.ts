import AuthApi from '../services/api/auth';
import appStore, { StoreEventsType } from '../services/store-manager';
import { UserResponse } from '../types';

class AccessController {
  userIsLoggined() {
    return new AuthApi()
      .userInfo()
      .then((response: UserResponse): boolean => {
        appStore.setValue(StoreEventsType.currentUserInfo, response);
        return true;
      })
      .catch((): boolean => false);
  }
}

export default new AccessController();
