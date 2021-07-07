import './templates/chats-list.precompiled';
import { chats } from '../../mocks/data.mock'

Handlebars.registerHelper("isdefined", value => !value);
const template1 = Handlebars.templates['chats-list'];
document.querySelector(".chats-list").innerHTML = template1(chats);