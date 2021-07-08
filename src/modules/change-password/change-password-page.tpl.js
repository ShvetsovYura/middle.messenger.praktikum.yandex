export default `
<main class="form-container">
  <form class="form form_small">
    <h2 class="form-header">Изменение пароля</h2>
    <div class="form-field form-field_inline">
      <label class="form-field__label form-field__label_inline" for="oldPassword">Текущий пароль</label>
      <input
        class="form-field__input form-field__input_underlined"
        type="text"
        name="oldPassword"
        id="oldPassword"
        required
      />
    </div>

    <div class="form-field form-field_inline">
      <label class="form-field__label" for="newPassword">Новый пароль</label>
      <input
        class="form-field__input form-field__input_underlined"
        type="password"
        name="newPassword"
        id="newPassword"
        required
      />
    </div>
    <div class="form-field form-field_inline">
      <label class="form-field__label" for="newPasswordRepeat">Повторите новый пароль</label>
      <input
        class="form-field__input form-field__input_underlined"
        type="password"
        name="newPasswordRepeat"
        id="newPasswordRepeat"
        required
      />
    </div>
    <div class="form-field">
      <button class="form-field__submit form-field__submit_large" type="submit">Сохранить</button>
    </div>
    <div>
      <a href="profile.html">Назад</a>
    </div>
  </form>
</main>
`;