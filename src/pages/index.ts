import render from '../utils/render';
import FormField from '../components/form-field/form-field';
import { loginValidator } from '../helpers/validators';

const el = new FormField({
  caption: 'Логин',
  id: 'login_name',
  required: true,
  validator: loginValidator,
});
render('#app', el);
