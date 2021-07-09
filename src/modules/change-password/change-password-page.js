import Handlebars from "handlebars";
import changePasswordPageTpl from "./change-password-page.tpl";

const template = Handlebars.compile(changePasswordPageTpl);
document.querySelector(".form-container").innerHTML = template();
