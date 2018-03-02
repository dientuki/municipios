import Helper from '../../helpers/js/generic';
//import Lazyload from '../../lazyload/js/lazyload';
import Validators from '../../helpers/js/validators';
import Wallop from '../vendor/Wallop';
//import '../scss/wallop.scss';
//import '../scss/wallop--slide.scss';

export default class Gallery {

  constructor(selectors, settings) {
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

    const element = document.querySelector(selectors);

    if (element !== null) {
      new Wallop(element, Helper.merge_objects(defaults, settings));
    }
  }
}