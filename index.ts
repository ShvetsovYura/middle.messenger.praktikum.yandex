import ChangePasswordPage from "./src/pages/change-password/change-password";
import ProfilePage from "./src/pages/profile-page/profile-page";
import RegistrationPage from "./src/pages/registeration-page/registration-page";
import render from "./src/utils/render";

const page = new ProfilePage();
render("#app", page);
