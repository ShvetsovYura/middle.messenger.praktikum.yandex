export type ValidationResult = { valid: boolean; message?: string };

function invalid(message: string): ValidationResult {
  return { valid: false, message: `${message}` };
}

function valid(): ValidationResult {
  return { valid: true };
}

export default class Validator {
  private _actionRules: Array<Function>;

  constructor() {
    this._actionRules = [];
  }

  public addRule(checkerCallback: Function) {
    this._actionRules.push(checkerCallback);
    return this;
  }

  public validate(value: any): ValidationResult {
    for (const rule of this._actionRules) {
      const result: ValidationResult = rule(value);
      if (result.valid === false) {
        return result;
      }
    }
    return { valid: true };
  }
}

export function shorterThan(criteria: number): Function {
  return function (value: string): ValidationResult {
    return value.length < criteria ? valid() : invalid(`Длина должна быть < ${criteria}`);
  };
}

export function longerThan(criteria: number): Function {
  return function (value: string): ValidationResult {
    return value.length > criteria ? valid() : invalid(`Длина должна быть > ${criteria}`);
  };
}

export function lengthBetween(min: number, max: number): Function {
  return function (value: string): ValidationResult {
    return value.length > min && value.length < max ? valid() : invalid(`Длинна > ${min} и < ${max}`);
  };
}

export function isEmail(): Function {
  const re = /^\S+@\S+\.\S{1,4}$/;
  return function (value: string): ValidationResult {
    return re.test(value) ? valid() : invalid('Не верный email');
  };
}

export function isVariousSymbols(): Function {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^J&*()]).*$/;
  return function (value: string): ValidationResult {
    return re.test(value)
      ? valid()
      : invalid(`Должна содержать заглавные и прописные латинские буквы,
           цифры, спецсимволы (один и более из !@#$%^J&*())`);
  };
}

export function latinLettersAndNumbers(): Function {
  const re = /^[a-zA-Z0-9]+$/;
  return function (value: string): ValidationResult {
    return re.test(value) ? valid() : invalid('Должны быть латинские символы (и/или цифры)');
  };
}

export function onlyLatinLetters(): Function {
  const re = /^[a-zA-Z]+$/;
  return function (value: string): ValidationResult {
    return re.test(value) ? valid() : invalid('Должны быть только латинские строчные или прописные буквы');
  };
}

export function onlyCyrilicLetters(): Function {
  const re = /^[а-яА-Я]+$/;
  return function (value: string): ValidationResult {
    return re.test(value) ? valid() : invalid('Должны быть только кириличиеские буквы');
  };
}

export function latinOrCyrilicLetters(): Function {
  const re = /^[а-яА-Яa-zA-Z]+$/;
  return function (value: string): ValidationResult {
    return re.test(value) ? valid() : invalid('Должны быть только латинские или кириличиеские буквы');
  };
}
