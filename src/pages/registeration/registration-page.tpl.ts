export default `<form class="form">
  <h2 class="form-header">{{title}}</h2>
  <div data-tpl-key='firstNameFormField'></div>
  <div data-tpl-key='secondNameFormField'></div>
  <div data-tpl-key='loginFormField'></div>
  <div data-tpl-key='emailFormField'></div>
  <div data-tpl-key='phoneFormField'></div>
  <div data-tpl-key='passwordFormField'></div>
  <div data-tpl-key='passwordRepeatFormField'></div>

  <div class="form-field">
    <div data-tpl-key='submitFormButton'></div>
  </div>
  <div>
    <p>Уже зарегистрированы? <div data-tpl-key='toLoginButton'></p>
  </div>
</form>
`;
