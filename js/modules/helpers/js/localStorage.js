export default class LocalStorage {

  static get(key, defaultValue) {
    let retrievedObject = JSON.parse(localStorage.getItem(key));

    if (retrievedObject === null) {
      retrievedObject = defaultValue;
      localStorage.setItem(key, JSON.stringify(retrievedObject));
    }

    return retrievedObject;
  }

  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

}