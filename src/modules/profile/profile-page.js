import "./profile-page.precompiled";
import { data } from "../../mocks/data.mock";

document.querySelector(".form-container").innerHTML = Handlebars.templates["profile-page"](data.userinfo);
