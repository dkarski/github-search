import { FormControl } from '@angular/forms';

export class CustomValidators {
  constructor() {}
  static isNullOrEmpty(formControl: FormControl): { [key: string]: any } {
    return formControl.value && formControl.value.replace(/\s/g, '').length !== 0
      ? null
      : { isNullOrEmpty: true };
  }
}
