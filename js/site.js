/* eslint-disable no-new */
import FontFaceObserver from 'fontfaceobserver';
import Flickity from 'flickity';
import Gallery from './modules/gallery/js/gallery';
import Menu from './modules/menu/js/menu';
import Lazyload from './modules/lazyload/js/lazyload';

/*
const Cabin = new FontFaceObserver('Cabin-regular', { weight: 400 }),
  Patua = new FontFaceObserver('PatuaOne-regular', { weight: 400 });

Promise.all([Patua.load(null, 5000), Cabin.load(null, 5000)]).then(() => {
  document.documentElement.classList.add('fonts-loaded');
});
*/

Lazyload.init();
new Flickity('#main-news', {
  autoPlay: 4000,
  prevNextButtons: false
});
//new Gallery('#last-news', { carousel: false });
new Flickity('#testimonials', {
  autoPlay: 4000,
  adaptiveHeight: true,
  prevNextButtons: false
});

new Flickity('#main-menu-slider', {
  freeScroll: true,
  contain: true,
  prevNextButtons: false,
  pageDots: false
});

new Menu();