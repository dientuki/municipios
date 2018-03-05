import Helper from '../../helpers/js/generic';
import Validators from '../../helpers/js/validators';
import Flickity from 'flickity';

export default class Gallery {

  constructor(selectors, settings) {

    this.element = document.querySelector(selectors);
    this.settings = settings;
    this.isWorking = false;

    if (window.innerWidth > 991) {
      this.create();
    }
    this.resize();
  }

  create() {
    this.flickity = new Flickity(this.element, this.settings);
  }

  destroy() {
    this.flickity.destroy();
  }

  resize() {
    window.addEventListener('resize', ()=> {

      const isWorking = window.innerWidth >= 991;

      if (this.isWorking !== isWorking) {
        this.isWorking = isWorking;

        if (this.isWorking) {
          this.create();
        } else {
          this.destroy();
        }
      }

    });
  }

}