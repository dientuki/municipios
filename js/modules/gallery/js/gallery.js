import Helper from '../../helpers/js/generic';
//import Lazyload from '../../lazyload/js/lazyload';
import Validators from '../../helpers/js/validators';
import Wallop from '../vendor/Wallop';
//import '../scss/wallop.scss';
//import '../scss/wallop--slide.scss';

export default class Gallery {

  constructor(selectors, settings, dot) {
    const defaults = { carousel: true },
      valid = ['buttonPreviousClass', 'buttonNextClass', 'itemClass', 'currentItemClass', 'showPreviousClass',
        'showNextClass', 'hidePreviousClass', 'hideNextClass', 'carousel', 'autoplay'];

    if (typeof selectors !== 'undefined') {
      if (typeof selectors !== 'string') {
        throw new Error('"settings" is mandatory and must be a string.');
      }
    }

    if (typeof settings !== 'undefined') {
      if (typeof settings !== 'object') {
        throw new Error('"settings" must be a json.');
      }

      Validators.settings(settings, valid);
    }

    this.element = document.querySelector(selectors);
    this.dot = this.element.querySelector(dot)

    if (this.element !== null) {
      this.wallop = new Wallop(this.element, Helper.merge_objects(defaults, settings));

      if (this.dot !== null) {
        this.change();
      }
    }
  }

  change(){
    this.wallop.on('change', (event) => {
      const dots = this.dot.querySelectorAll('.dot');

      Array.from(dots).forEach((dot) => {
        dot.classList.remove('selected');
      });
      dots[event.detail.currentItemIndex].classList.add('selected');

    });
  }
}