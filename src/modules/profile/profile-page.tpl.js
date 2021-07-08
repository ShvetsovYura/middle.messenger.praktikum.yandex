export default `
<main class="form-container">
  <form class="form form_medium">
    <h2 class="form-header">
      Профиль пользователя
    </h2>
    <div class="form-field">
      <label class="form-field__avatar">
        <input class="form-field__file" type="file" name="avatar" id="avatar" />
        <img src="/img/img_avatar.png" class="form-field__avatar" alt="avatar" />
      </label>
    </div>
    <div class="form-field form-field_underlined form-field_inline">
      <label class="form-field__label form-field__label_inline" for="first_name">Имя</label>
      <input
        class="form-field__input form-field__input_medium"
        type="text"
        name="first_name"
        id="first_name"
        value="{{first_name}}"
        required
        disabled
      />
    </div>
    <div class="form-field form-field_underlined form-field_inline">
      <label class="form-field__label form-field__label_inline" for="second_name">Фамилия</label>
      <input
        class="form-field__input form-field__input_medium"
        type="text"
        name="second_name"
        id="second_name"
        value="{{second_name}}"
        required
        disabled
      />
    </div>
    <div class="form-field form-field_underlined form-field_inline">
      <label class="form-field__label form-field__label_inline" for="display_name">Имя в чате</label>
      <input
        class="form-field__input form-field__input_medium"
        type="text"
        name="display_name"
        id="display_name"
        value="{{display_name}}"
        required
        disabled
      />
    </div>

    <div class="form-field form-field_underlined form-field_inline">
      <label class="form-field__label form-field__label_inline" for="login">Логин</label>
      <input
        class="form-field__input form-field__input_medium"
        type="text"
        name="login"
        id="login"
        value="{{login}}"
        required
        disabled
      />
    </div>

    <div class="form-field form-field_underlined form-field_inline">
      <label class="form-field__label form-field__label_inline" for="email">Почта</label>
      <input
        class="form-field__input form-field__input_medium"
        type="email"
        name="email"
        id="email"
        value="{{email}}"
        required
        disabled
      />
    </div>

    <div class="form-field form-field_underlined form-field_inline">
      <label class="form-field__label form-field__label_inline" for="phone">Телефон</label>
      <input
        class="form-field__input form-field__input_medium"
        type="tel"
        name="phone"
        id="phone"
        value="{{phone}}"
        required
        disabled
      />
    </div>

    <div class="form-field form-field_inline">
      <a class="form-field__submit" href="#">Изменить данные</a>
      <a class="form-field__submit" href="change-password.html">Изменить пароль</a>
      <button class="form-field__submit">
        Выйти
      </button>
    </div>
  </form>
</main>
`;
