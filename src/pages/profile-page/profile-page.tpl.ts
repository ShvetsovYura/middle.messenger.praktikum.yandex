export default `
<form class="form form_medium">
  <h2 class="form-header">{{title}}</h2>
  <div class="form-field">
    <label class="form-field__avatar">
      <input class="form-field__file" type="file" name="avatar" id="avatar" />
      <img src="/img/img_avatar.png" class="form-field__avatar" alt="avatar" />
    </label>
  </div>
  <div data-tpl-key='firstNameFormField'></div>
  <div data-tpl-key='secondNameFormField'></div>
  <div data-tpl-key='displayNameFormField'></div>
  <div data-tpl-key='loginFormField'></div>
  <div data-tpl-key='emailFormField'></div>
  <div data-tpl-key='phoneFormField'></div>
  <div data-tpl-key='loginFormField'></div>
  
  
  </div>
  <div class="form-field form-field_inline">
    <a class="form-field__submit" href="#">Изменить данные</a>
    <a class="form-field__submit" href="change-password.html">Изменить пароль</a>
    <button class="form-field__submit">Выйти</button>
  </div>
</form>
`;
