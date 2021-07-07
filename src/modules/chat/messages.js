import './templates/messages-list.precompiled.js';
import { messages } from '../../mocks/data.mock'


const template = Handlebars.templates['messages-list'];
document.querySelector(".chat-messages-container").innerHTML = template(messages);