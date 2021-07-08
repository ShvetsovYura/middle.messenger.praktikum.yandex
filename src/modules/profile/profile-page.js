import Handlebars from "handlebars";
import profilePageTpl from "./profile-page.tpl";
import { data } from "../../mocks/data.mock";

const template = Handlebars.compile(profilePageTpl);
document.body.innerHTML = template(data.userinfo);
