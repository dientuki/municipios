import Axios from 'axios';

export default class Rest {

  // Constructor() {}

  /* eslint-disable dot-notation, dot-location */
  static token() {
    return new Promise((resolve, reject) => {
      Axios.get('/services/session/token')
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

}