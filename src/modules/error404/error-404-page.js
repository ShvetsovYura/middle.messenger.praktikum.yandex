const Handlebars = require("handlebars");
import error404PageTpl from "./error-404-page.tpl";

const template = Handlebars.compile(error404PageTpl);
document.querySelector(".error-page").innerHTML = template();
