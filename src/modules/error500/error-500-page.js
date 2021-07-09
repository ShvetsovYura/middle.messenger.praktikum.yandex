import Handlebars from "handlebars";
import error500PageTpl from "./error-500-page.tpl";

const template = Handlebars.compile(error500PageTpl);
document.querySelector(".error-page").innerHTML = template();
