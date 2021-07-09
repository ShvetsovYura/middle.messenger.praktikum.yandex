import Handlebars from "handlebars";
import loginPageTpl from "./login-page.tpl";

const template = Handlebars.compile(loginPageTpl);
document.querySelector(".form-container").innerHTML = template();
