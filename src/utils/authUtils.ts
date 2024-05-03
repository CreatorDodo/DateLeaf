export interface ValidationStrategy {
  nameValidate(input: string): boolean;
  phoneValidate(input: string): boolean;
  emailValidate(input: string): boolean;
  passwordValidate(input: string): boolean;
  pwCheckValidate(pwCheck: string, password: string): boolean;
}

export class LooseValidation implements ValidationStrategy {
  nameValidate(name: string): boolean {
    return name.length >= 2;
  }
  phoneValidate(phone: string): boolean {
    return phone.length == 11;
  }

  pwCheckValidate(pwCheck: string, password: string): boolean {
    return pwCheck == password;
  }

  emailValidate(email: string): boolean {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
  }
  passwordValidate(input: string): boolean {
    return input.length >= 6;
  }
}

export class StrongValidation implements ValidationStrategy {
  nameValidate(name: string): boolean {
    return name.length >= 2;
  }
  phoneValidate(phone: string): boolean {
    return phone.length == 11;
  }
  pwCheckValidate(pwCheck: string, password: string): boolean {
    return pwCheck == password;
  }
  emailValidate(password: string): boolean {
    return password.length >= 6;
  }
  passwordValidate(input: string): boolean {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(input);
  }
}

export class ValidateProcessor {
  #validator: ValidationStrategy;
  constructor(validator: ValidationStrategy) {
    this.#validator = validator;
  }

  setValidator(validator: ValidationStrategy) {
    this.#validator = validator;
  }

  isValidName(name: string) {
    return this.#validator.nameValidate(name);
  }

  isValidPhone(phone: string) {
    return this.#validator.phoneValidate(phone);
  }

  isValidEmail(email: string) {
    return this.#validator.emailValidate(email);
  }

  isValidPassword(password: string) {
    return this.#validator.passwordValidate(password);
  }

  isValidPwCheck(password: string, pwCheck: string) {
    return this.#validator.pwCheckValidate(password, pwCheck);
  }
}