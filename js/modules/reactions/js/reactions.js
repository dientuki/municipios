import Axios from 'axios';
import LS from '../../helpers/js/localStorage';
import Rest from '../../helpers/js/rest';

export default class Reactions {

  constructor(element) {
    if (typeof element !== 'string') {
      throw new Error('"elements" is mandatory and must be a string.');
    }

    this.container = document.querySelector(element);
    this.vote = undefined;
    this.nid = this.container.dataset.nid;
    this.ls = 'CiudadComReactions';
    this.showVotes();
  }

  checkIfVoted() {
    const retrievedObject = LS.get(this.ls, []);

    return retrievedObject.includes(this.nid);
  }

  /* eslint-disable dot-notation, dot-location */
  showVotes() {
    Axios.get(`/services2/reacciones/${this.nid}.json`)
      .then((response) => {
        this.container.querySelector('.reaction-yes .reaction-number').innerHTML = response.data.yes;
        this.container.querySelector('.reaction-no .reaction-number').innerHTML = response.data.no;
        this.enableAction();
      }).catch(function (error) {
        throw new Error(error);
    });
  }
  /* eslint-enable */

  enableAction() {

    if (this.checkIfVoted()) {
      return false;
    }

    let disableAction;

    const clickNo = () => {
      if (this.checkIfVoted() === false) {
        this.plus(this.container.querySelector('.reaction-no .reaction-number'));
        this.vote = -1;
        this.doVote();
      }
      disableAction();
    },
    clickYes = () => {
      if (this.checkIfVoted() === false) {
        this.plus(this.container.querySelector('.reaction-yes .reaction-number'));
        this.vote = 1;
        this.doVote();
      }
      disableAction();
    };

    disableAction = () => {
      this.container.querySelector('.reaction-yes').removeEventListener('click', clickYes);
      this.container.querySelector('.reaction-no').removeEventListener('click', clickNo);
      this.container.classList.remove('can-vote');
    };

    this.container.querySelector('.reaction-yes').addEventListener('click', clickYes);
    this.container.querySelector('.reaction-no').addEventListener('click', clickNo);
    this.container.classList.add('can-vote');

    return true;
  }

  static plus(element) {
    element.innerHTML = parseInt(element.innerHTML, 10) + 1;
  }

  storageVote() {
    const retrievedObject = LS.get(this.ls, []);

    retrievedObject.push(this.nid);
    LS.set(this.ls, retrievedObject);
  }

  /* eslint-disable dot-notation, dot-location */
  doVote() {
    Rest.token().then((csrfToken) => {
      // "Stuff worked!"

      Axios.post('/services2/votacion/vote.json', {
        id: this.container.dataset.nid,
        tipo: 'node',
        uid: 0,
        valor: this.vote,
        vote_source: '127.0.0.1'
      }, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        }
      }).then(() => {
          this.storageVote();

        }).catch(function (error) {
          throw new Error(error);
      });

    }).catch(function (error) {
      throw new Error(error);
    });
  }
  /* eslint-enable */

}