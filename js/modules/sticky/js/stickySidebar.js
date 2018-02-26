import Helper from '../../helpers/js/generic';
import StickySidebarE from 'sticky-sidebar';

export default class StickySidebar {

  constructor(element, settings, size) {

    const defaults = {
      topSpacing: 70
    };

    this.size = size || 1561;
    this.settings = Helper.merge_objects(defaults, settings);
    this.element = element;
    this.isWorking = window.innerWidth >= this.size;

    if (document.querySelector(this.element) !== null) {
      if (this.isWorking) {
        this.create();
      }
      this.resize();
    }
  }

  create() {
    this.sidebar = new StickySidebarE(this.element, this.settings);

    this.observer = Helper.observeDomElement(document.querySelector(this.settings.containerSelector),
      {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true
      },
      () => {
        this.sidebar.updateSticky();
      });

    window.scrollTo(window.scrollX, window.scrollY + 1);

    setTimeout(() => {
      window.scrollTo(window.scrollX, window.scrollY - 1);
    }, 50);
  }

  destroy() {
    this.observer.disconnect();
    this.sidebar.destroy();
  }

  resize() {
    window.addEventListener('resize', () => {
      const isWorking = window.innerWidth >= this.size;

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