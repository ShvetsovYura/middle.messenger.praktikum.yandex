import render from '../../utils/render';
import ErrorPage from './error-page';

render(
  '#app',
  new ErrorPage({
    errorCode: '404',
    errorMessage: 'Такой стараницы на существует',
    backLink: '/index.html',
  }),
);
