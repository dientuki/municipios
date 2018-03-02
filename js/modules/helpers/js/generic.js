export default class Generic {

  // Constructor() {}

  /* eslint-disable prefer-const */
  static merge_objects(defaults, custom) {
    if (typeof defaults === 'undefined') {
      throw new Error('"defaults" object must be given');
    }
    if (typeof defaults !== 'object' || (typeof custom !== 'undefined' && typeof custom !== 'object')) {
      throw new Error('Args must be an object');
    }

    let final = {},
      propertyName;

    for (propertyName in defaults) {
      final[propertyName] = defaults[propertyName];
    }

    for (propertyName in custom) {
      final[propertyName] = custom[propertyName];
    }

    return final;
  }
  /* eslint-enable prefer-const */

  static setAttributes(el, attrs) {
    for (const key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

  /* eslint-disable func-names, no-invalid-this */
  static observeDomElement(target, config, callback) {
    const observer = new MutationObserver(function (mutations) {
      callback(target, mutations, this);
    });

    observer.observe(target, config);

    return observer;
  }
  /* eslint-enable unc-names, no-invalid-this */

  /* eslint-disable no-console */
  // It's a safely console.log, because the bears roar
  static roar(message) {
    if (typeof console !== undefined) {
      console.log(message);
    }
  }
  /* eslint-enable no-console*/

}