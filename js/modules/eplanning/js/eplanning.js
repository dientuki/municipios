/*
 * Tooth fairy, she bring the food, money, and bitches in the middle of the night :), don't mess with her please
 */
import Helper from '../../helpers/js/generic';

export default class Eplanning {

  constructor() {
    const banners = document.querySelectorAll('.banner');

    this.protocol = document.location.protocol ? document.location.protocol : window.top.location.protocol;
    this.eplArgs = {
      custom: {},
      eIs: [],
      iIF: 1,
      sI: '14f84',
      sV: `${this.protocol}//ads.e-planning.net/`,
      sec: document.body.dataset.sec || 'Home',
      vV: '4'
    };
    this.eS1 = 'us.img.e-planning.net';
    this.eplLL = false;

    for (let i = 0, l = banners.length; i < l; i++) {
      this.eplArgs.eIs.push(banners[i].dataset.eis);
    }

    this.eplInit();

    for (let i = 0, l = banners.length; i < l; i++) {
      this.eplAD4M(banners[i].dataset.eis, banners[i], false);
    }
  }

  eplInit() {
    if (this.eplLL === true) {
      return;
    }

    const cookieName = `${this.protocol === 'https:' ? 'EPLSERVER_S' : 'EPLSERVER'}=`,
      dc = document.cookie;

    let ci = dc.indexOf(cookieName),
      eS2;

    if (ci !== -1) {
      let ce = dc.indexOf(';', ci);

      ci += cookieName.length;
      if (ce === -1) {
        ce = dc.length;
      }
      eS2 = dc.substring(ci, ce);
    }

    this.makeIframe(eS2);
    this.eplLL = true;
  }

  /* eslint-disable one-var */
  makeIframe(eS2) {
    const eIF = document.createElement('IFRAME');

    Helper.setAttributes(eIF, {
      height: 0,
      id: 'epl4iframe',
      name: 'epl4iframe',
      src: 'about:blank',
      style: 'width:0; height:0; display:none',
      width: 0
    });
    document.body.appendChild(eIF);

    const eIFD = eIF.contentDocument ? eIF.contentDocument : eIF.document,
      s = eIFD.createElement('SCRIPT'),
      ss = eIFD.createElement('SCRIPT');

    eIFD.open();
    eIFD.close();

    s.src = `${this.protocol}//${(eS2 ? eS2 : this.eS1)}/layers/epl-41.js`;
    eIFD.body.appendChild(s);

    if (!eS2) {
      ss.src = `${this.protocol}//ads.e-planning.net/egc/4/14dc3`;
      eIFD.body.appendChild(ss);
    }
  }
  /* eslint-enable one-var */

  eplCheckStart() {
    if (document.epl) {
      const e = document.epl;

      if (e.eplReady()) {
        return true;
      }
      e.eplInit(this.eplArgs);
      if (this.eplArgs.custom) {
        for (const s in this.eplArgs.custom) {
          document.epl.setCustomAdShow(s, this.eplArgs.custom[s]);
        }
      }
      return e.eplReady();
    }
    this.eplInit();
    return false;
  }

  eplSetAdM(eID, custF) {
    if (this.eplCheckStart()) {
      if (custF) {
        document.epl.setCustomAdShow(eID, this.eplArgs.custom[eID]);
      }
      document.epl.showSpace(eID);
    } else {
      setTimeout(() => {
        this.eplSetAdM(eID, custF);
      }, 250);
    }
  }

  eplAD4M(eID, element, custF) {
    const ad = document.createElement('div');

    ad.setAttribute('id', `eplAdDiv${eID}`);
    ad.classList.add('epl-ad');
    element.appendChild(ad);

    if (custF) {
      this.eplArgs.custom[eID] = custF;
    }

    this.eplSetAdM(eID, custF);
  }

}