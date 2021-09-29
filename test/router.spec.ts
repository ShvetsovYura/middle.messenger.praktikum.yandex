// import Router from '../src/services/router/router';

import { expect } from 'chai';
import LoginPage from '../src/pages/login';
import RegistrationPage from '../src/pages/registeration';
import Router from '../src/services/router/router';

const router = new Router('#app');

router.use('/', LoginPage).use('/sign-up', RegistrationPage).start();

describe('Проверяем роутер', () => {
  it('Должен быть переход', () => {
    router.go('/sign-up');
    expect(router.history.length).to.equal(2);
  });
});
