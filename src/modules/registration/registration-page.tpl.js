export default `<main class="form-container">
  <form class="form form_small">
    <h2 class="form-header">
      Регистрация пользователя
    </h2>
    <div class="form-field">
      <label class="form-field__label form-field__label_block" for="first_name">Имя</label>
      <input
        class="form-field__input form-field__input_underlined"
        type="text"
        name="first_name"
        id="first_name"
        requiredF
      />
      <span class="form-field__validation-message">
        Поле не может быть пустым
      </span>
    </div>
    <div class="form-field">
      <label class="form-field__label" for="second_name">Фамилия</label>
      <input
        class="form-field__input form-field__input_underlined"
        type="text"
        name="second_name"
        id="second_name"
        required
      />
      <span class="form-field__validation-message">
        Поле не может быть пустым
      </span>
    </div>
    <div class="form-field">
      <label class="form-field__label" for="login">Логин</label>
      <input class="form-field__input form-field__input_underlined" type="text" name="login" id="login" required />
      <span class="form-field__validation-message">
        Поле не может быть пустым
      </span>
    </div>
    <div class="form-field">
      <label class="form-field__label" for="email">Электронная почта</label>
      <input class="form-field__input form-field__input_underlined" type="email" name="email" id="email" required />
      <span class="form-field__validation-message">
        Поле не может быть пустым
      </span>
    </div>
    <div class="form-field">
      <label class="form-field__label" for="password">Пароль</label>
      <input
        class="form-field__input form-field__input_underlined"
        type="password"
        name="password"
        id="password"
        required
      />
      <span class="form-field__validation-message">
        Поле не может быть пустым
      </span>
    </div>
    <div class="form-field">
      <label class="form-field__label" for="password-repeat">Пароль (еще раз)</label>
      <input
        class="form-field__input form-field__input_underlined"
        type="password"
        name="password-repeat"
        id="password-repeat"
        required
      />
      <span class="form-field__validation-message form-field__validation-message_hide">
        Пароли не совпадают
      </span>
    </div>
    <div class="form-field">
      <button class="form-field__submit" type="submit">
        Зарегистрироваться
      </button>
    </div>
    <div>
      <p>Уже зарегистрированы? <a href="login.html">Войти</a></p>
    </div>
  </form>
</main>
`;