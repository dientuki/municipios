import Helper from '../../helpers/js/generic';

export default class StickyHeader {

  constructor(settings) {

    const defaults = {
      css: 'is-fixed',
      element: '#header'
    };

    this.opts = Helper.merge_objects(defaults, settings);
    this.top = document.querySelector(this.opts.element).offsetTop;

    document.addEventListener('scroll', () => {
      this.onScroll();
    });

    this.onScroll();
  }

  onScroll() {
    let offset = window.pageYOffset;

    if (offset === undefined) {
      offset = document.documentElement.scrollTop;
    }

    this.isSticky = offset > this.top;

    if (this.isSticky !== document.body.classList.contains(this.opts.css)) {
      document.body.classList.toggle(this.opts.css);
    }
  }

}