import { compile } from 'handlebars';
import Validator, { ValidationResult } from '../../services/validator';
import BaseComponent from '../base-component';
import InputErrrorMessage from '../ui/input-error-message/InputErrorMessage';
import Input from '../ui/input/input';
import Label from '../ui/label/label';
import template from './form-field.tpl';

export type FormFieldProps = {
  id: string;
  type?: 'text' | 'password' | 'number' | 'tel' | 'email';
  required?: boolean;
  disabled?: boolean;
  caption: string;
  events?: Record<string, Function>;
  message?: string;
  value?: string;
  class?: string;
  validator?: any;
};

export default class FormField extends BaseComponent {
  validator: Validator | undefined;

  valid: boolean;

  constructor(props: FormFieldProps) {
    super('div', {
      children: {
        label: new Label({
          caption: props.caption,
          for: props.id,
        }),
        input: new Input({
          id: props.id,
          name: props.id,
          required: props.required,
          disabled: props.disabled,
          events: {
            blur: () => this.validateField(),
            focus: () => this.validateField(),
            input: () => this.validateField(),
          },
          value: props.value,
          type: props.type,
        }),
        errorMessage: new InputErrrorMessage({ message: props.message || '' }),
      },
    });

    this.validator = props.validator;
    this.valid = false;
  }

  getValue() {
    return this.props.children.input.getValue();
  }

  validateField(): boolean | undefined {
    if (!this.validator) return undefined;
    const { value } = this.props.children.input.element;
    const res: ValidationResult = this.validator.validate(value);
    const { errorMessage } = this.props.children;
    if (res.valid) {
      this.valid = true;
      errorMessage.setProps({ message: '' });
    } else {
      this.valid = false;
      errorMessage.setProps({ message: res.message });
    }

    return res.valid;
  }

  render() {
    const tpl = compile(template, { noEscape: true });
    const {
      id,
      label,
      inline,
      underline,
    } = this.props;
    return tpl({
      labelFor: id,
      label,
      inline,
      underline,
    });
  }
}
