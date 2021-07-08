export default `
<main class="form-container">
  <form class="form form_small">
    <h2 class="form-header">
      Вход
    </h2>
    <div class="form-field form-field_inline">
      <label class="form-field__label form-field__label_inline" for="login">Логин</label>
      <input
        class="form-field__input form-field__input_underlined"
        type="text"
        name="first_name"
        id="first_name"
        required
      />
    </div>

    <div class="form-field form-field_inline">
      <label class="form-field__label" for="password">Пароль</label>
      <input
        class="form-field__input form-field__input_underlined"
        type="password"
        name="password"
        id="password"
        required
      />
    </div>
    <div class="form-field">
      <button class="form-field__submit form-field__submit_large" type="submit">
        Войти
      </button>
    </div>
    <div>
      <p>Нет аккаунта? <a href="registration.html">Зарегистрироваться</a></p>
    </div>
  </form>
</main>
`;