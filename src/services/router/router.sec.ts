import { expect } from 'chai';
import LoginPage from '../../pages/login';
import RegistrationPage from '../../pages/registeration';
import Router from './router';

const router = new Router('#app');

router.use('/', LoginPage).use('/sign-up', RegistrationPage).start();

describe('Проверяем роутер', () => {
  it('Должен быть переход', () => {
    router.go('/');
    expect(router.history.length).to.equal(2);
  });
});
