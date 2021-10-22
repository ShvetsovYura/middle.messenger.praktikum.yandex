import { registerHelper } from 'handlebars';
import ChangePasswordPage from './pages/change-password/change-password';
import ErrorPage404 from './pages/error-page-404/index';
import ErrorPage500 from './pages/error-page-500/index';
import LoginPage from './pages/login/index';
import MessengerPage from './pages/messenger';
import ProfilePage from './pages/profile';
import RegistrationPage from './pages/registeration/index';
import Router from './services/router/router';
import './styles/style.less';

registerHelper('isdefined', (value) => !value);
registerHelper('stringDateToTime', (dt: string) => {
  const date = new Date(dt);
  if (date) {
    return date.toLocaleString();
  }
  return '';
});

const router = new Router('#app');

router
  .use('/', LoginPage)
  .use('/sign-up', RegistrationPage)
  .use('/messenger', MessengerPage)
  .use('/settings', ProfilePage)
  .use('/404', ErrorPage404)
  .use('/500', ErrorPage500)
  .use('/change-password', ChangePasswordPage)
  .start();

export default router;
