export default class Validators {

  // Constructor() {}

  static settings(argument, valid) {
    let prop;

    for (prop in argument) {
      if (valid.indexOf(prop) === -1) {
        throw new Error(`${prop} option is invalid.`);
      }
    }
  }

}