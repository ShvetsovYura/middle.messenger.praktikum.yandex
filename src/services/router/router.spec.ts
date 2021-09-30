/* eslint-disable max-classes-per-file */
import { expect } from 'chai';
import BaseComponent from '../../components/base-component';
import Router from './router';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const { window } = new JSDOM(
  `
  <!doctype html>
    <html>
         <body>
             <div id="app"></div>
         </body>
       </html>`,
  { url: 'http://localhost' },
);

global.window = window;

global.document = window.document;

class TestPage1 extends BaseComponent {
  constructor() {
    super('template');
  }

  render() {
    return '';
  }
}

class TestPage2 extends BaseComponent {
  constructor() {
    super('template');
  }

  render() {
    return '';
  }
}

describe('Тест роутера', () => {
  const router = new Router('#app');
  router.use('/', TestPage1).use('/sign-up', TestPage2);

  it('Количество зарегестрированных страниц', () => {
    expect(router.routes.length).to.eq(2);
  });

  it('Стартовый путь и страница', () => {
    router.start();
    expect(window.location.pathname).to.be.eq('/');
  });

  it('Переходы на страницы', () => {
    router.go('/sign-up');
    router.go('/');
    expect(router.history.length).to.equal(3);
  });

  it('Пути ссылаются на нужные компоненты', () => {
    router.go('/sign-up');
    expect(router.currentRoute?.block).is.instanceOf(TestPage2);
    router.go('/');
    expect(router.currentRoute?.block).is.instanceOf(TestPage1);
  });
});
