import Helper from '../../helpers/js/generic';

export default class Cxense {

  constructor() {
    this.loaded = false;
    this.cX = false;
    this.js = document.createElement('script');
    this.src = `http${(window.location.protocol === 'https:' ? 's://s' : '://')}cdn.cxense.com/cx.js`;
    this.element = document.getElementById('cx-root');
    this.loadSDK();
  }

  loadSDK() {
    Helper.setAttributes(this.js, {
      async: 'async',
      src: this.src
    });

    this.js.addEventListener('load', () => {
      this.loaded = true;

      this.cX = window.cX || {};
      this.cX.callQueue = this.cX.callQueue || [];
      this.cX.callQueue.push(['setSiteId', this.element.dataset.siteid]);

      if (window.location.host.indexOf('master') === -1) {
        this.cX.callQueue.push(['sendPageViewEvent']);
      } else {
        Helper.roar('No crawler for master - cxense');
      }

      if (this.element.dataset.events !== undefined) {
        const events = JSON.parse(this.element.dataset.events);

        for (const event in events) {
          if (this[event] !== undefined) {
            this[event](events[event]);
          }
        }
      }
    });

    document.body.appendChild(this.js);
  }

  insertWidget(args) {
    const defaults = {
      height: 'auto',
      renderTemplateUrl: 'auto',
      width: '100%'
    };

    this.cX.callQueue.push(['insertWidget', Helper.merge_objects(defaults, args)]);
  }

}