import Handlebars from "handlebars";
import chatPageTpl from "./chat-page.tpl.js";
import { data } from "../../mocks/data.mock";

Handlebars.registerHelper("isdefined", (value) => !value);
const template = Handlebars.compile(chatPageTpl);
document.body.innerHTML = template(data);
