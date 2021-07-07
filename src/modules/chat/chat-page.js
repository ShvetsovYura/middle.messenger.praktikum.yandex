import './chat-page.precompiled';
import { data } from '../../mocks/data.mock'

Handlebars.registerHelper("isdefined", value => !value);
const template1 = Handlebars.templates['chat-page'];
document.querySelector(".chat-main").innerHTML = template1(data);