import Helper from '../../helpers/js/generic';
import Validators from '../../helpers/js/validators';
import Flickity from 'flickity';

export default class Gallery {

  constructor(selectors, settings, dot) {

    this.element = document.querySelector(selectors);
    this.dot = this.element.querySelector(dot)

    this.flickity = new Flickity(this.element, settings);

  }

}