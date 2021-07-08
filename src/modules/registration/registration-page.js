import Handlebars from "handlebars";
import registrationPageTpl from "./registration-page.tpl";

const template = Handlebars.compile(registrationPageTpl);
document.body.innerHTML = template();
