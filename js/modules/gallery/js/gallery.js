import Helper from '../../helpers/js/generic';
import Lazyload from '../../lazyload/js/lazyload';
import Validators from '../../helpers/js/validators';
import Wallop from 'wallop';
import '../scss/wallop.scss';
import '../scss/wallop--fade.scss';

export default class Gallery {

  constructor(selectors, settings, miliseconds) {
    const defaults = { carousel: true },
      select = ['action', 'gallery'],
      valid = ['buttonPreviousClass', 'buttonNextClass', 'itemClass', 'currentItemClass', 'showPreviousClass',
        'showNextClass', 'hidePreviousClass', 'hideNextClass', 'carousel'];

    if (typeof selectors !== 'undefined') {
      if (typeof selectors !== 'object') {
        throw new Error('"settings" is mandatory and must be a json.');
      }

      Validators.settings(selectors, select);
    }

    if (typeof settings !== 'undefined') {
      if (typeof settings !== 'object') {
        throw new Error('"settings" must be a json.');
      }

      Validators.settings(settings, valid);
    }

    this.selectors = selectors;
    this.init(Helper.merge_objects(defaults, settings), miliseconds);
  }

  init(settings, miliseconds) {
    const gallery = document.querySelector(this.selectors.gallery);

    if (gallery !== null) {
      this.slider = new Wallop(gallery, settings);
      this.onClick(miliseconds);
    }
  }

  onClick(miliseconds) {
    if (this.selectors.action === undefined) {
      Lazyload.init({ elements_selector: `#${document.querySelector(this.selectors.gallery).id} .delay-lzl` });
      return false;
    }

    const action = document.querySelector(this.selectors.action);

    action.addEventListener('click', () => {
      this.slider.on('change', () => {
        setTimeout(() => {
          this.slider.next();
        }, miliseconds || 2000);
      });

      this.slider.next();
      action.remove();
      Lazyload.init({elements_selector: `#${document.querySelector(this.selectors.gallery).id} .delay-lzl`});
    });

    return true;
  }

}