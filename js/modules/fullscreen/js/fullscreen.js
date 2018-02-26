import '../scss/fullscreen.scss';

export default class Fullscreen {

  constructor(elements) {
    if (typeof elements !== 'string') {
      throw new Error('"elements" is mandatory and must be a string.');
    }

    this.elements = document.querySelectorAll(elements);

    if (this.elements.length === 0) {
      throw new Error('"elements" must be an DOMobject.');
    }

    this.isFullscreen = false;

    for (let i = 0, l = this.elements.length; i < l; i++) {
      this.elements[i].addEventListener('click', () => {
        if (this.isFullscreen) {
          this.exit_fullscreen();
        } else {
          this.enter_fullscreen(i);
        }
      });
    }
  }

  enter_fullscreen(i) {
    if (typeof i !== 'number') {
      throw new Error('"i" is mandatory and must be a number.');
    }

    if (this.elements[i].requestFullscreen) {
      this.elements[i].requestFullscreen();
    } else if (this.elements[i].webkitRequestFullscreen) {
      this.elements[i].webkitRequestFullscreen();
    } else if (this.elements[i].mozRequestFullScreen) {
      this.elements[i].mozRequestFullScreen();
    } else if (this.elements[i].msRequestFullscreen) {
      this.elements[i].msRequestFullscreen();
    } else {
      throw new Error('Fullscreen API is not supported.');
    }

    this.isFullscreen = true;
  }

  exit_fullscreen() {
    /* istanbul ignore next */
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else {
      throw new Error('Fullscreen API is not supported.');
    }

    this.isFullscreen = false;
  }

}