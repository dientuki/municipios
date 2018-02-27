/* eslint-disable no-new */
import FontFaceObserver from 'fontfaceobserver';
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
new Gallery({
  action: '.gallery-init',
  gallery: '.Wallop'
},
{ carousel: true }, 5000);
new Menu();
