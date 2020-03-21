export class FormValidator {
  static isEmpty(arr) {
    for (let str of arr) {
      if (str.length === 0) {
        return true;
      }
    }

    return false;
  }

  static corectness = false;

  static isFullFilled(form) {
    let status = true;
    form.each(function(){
      if ($(this).val() === '') {
        status = false;
      }
    })

    if (status === false) {
      return false;
    }
    
    return status;
  }

  static isProper(value, regexp) {
    if (value.match(regexp)) {
      FormValidator.corectness = true;
      return true;
    }

    FormValidator.corectness = false;
    return false;
  }

  static getFormStatus() {
    return FormValidator.corectness;
  }
}