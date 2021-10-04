import Validator, {
  isEmail,
  isVariousSymbols,
  latinOrCyrilicLetters,
  longerThan,
  onlyCyrilicLetters,
  latinLettersAndNumbers,
} from '../../services/validator';

export const loginValidator = new Validator()
  .addRule(latinLettersAndNumbers())
  .addRule(longerThan(6));
export const passwordValidator = new Validator().addRule(isVariousSymbols()).addRule(longerThan(6));
export const firstNameValidator = new Validator()
  .addRule(longerThan(1))
  .addRule(onlyCyrilicLetters());
export const nameValidator = new Validator()
  .addRule(longerThan(3))
  .addRule(latinOrCyrilicLetters());
export const displayNameValidator = new Validator()
  .addRule(latinOrCyrilicLetters())
  .addRule(longerThan(3));
export const emailValidator = new Validator().addRule(isEmail());
export const phoneValidator = new Validator().addRule(longerThan(8));
