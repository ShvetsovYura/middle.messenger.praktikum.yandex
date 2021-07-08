import Handlebars from "handlebars";
import error404PageTpl from "./error-404-page.tpl";

const template = Handlebars.compile(error404PageTpl);
document.body.innerHTML = template();
