export default `<form class="form">
  <h2 class="form-header">{{title}}</h2>
  <div data-tpl-key="loginFormField"></div>
  <div data-tpl-key="passwordFormField"></div>
  {{#if error}}
    <span>{{error}}</span>
  {{/if}}
  <div class="form-field">
    <div data-tpl-key="submitFormButton"></div>
  </div>
  <div>
    <p>Нет аккаунта? <div data-tpl-key='toRegistrationFormButton'></div></p>
  </div>
</form>
`;
