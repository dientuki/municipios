import Helper from '../../helpers/js/generic';

export default class Facebook {

  constructor() {
    this.loaded = false;
    this.FB = false;
    this.js = document.createElement('script');
    this.loadSDK(document.getElementById('fb-root').dataset.appid);
  }

  loadSDK(appId) {
    Helper.setAttributes(this.js, {
      async: 'async',
      src: `https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.10&appId=${appId}`
    });
    this.js.addEventListener('load', () => {
      this.loaded = true;
      if (window.FB) {
        this.FB = true;
      }
    });

    document.body.appendChild(this.js);
  }

}