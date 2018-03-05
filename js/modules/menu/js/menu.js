import Helper from '../../helpers/js/generic';

export default class Menu {

  constructor() {
    const empresas = document.querySelectorAll('#main-menu .empresa'),
      secondaries = document.querySelectorAll('#secondary-menu .empresa'),
      secondary_menu = document.querySelector('#secondary-menu');

    Array.from(empresas).forEach((empresa, index) => {
      empresa.addEventListener('mouseover', function (event) {
        if (this.classList.contains("selected") == true) {
          return false;
        }

        Array.from(empresas).forEach((empresa) => {
          empresa.classList.remove('selected');
        });
        empresa.classList.add('selected');

        Array.from(secondaries).forEach((secondary) => {
          secondary.classList.remove('selected');
        });
        secondaries[index].classList.add('selected');
        secondary_menu.style.backgroundColor = secondaries[index].dataset.bg;
      });
    });

    Array.from(secondary_menu.querySelectorAll('.empresa-drowpdown')).forEach( (dropdow) => {
      console.log(dropdow);

      dropdow.addEventListener('change', (event) => {
        if (event.target.selectedIndex === 0) {
          return;
        }

        location.assign(`${window.location.protocol}//${window.location.host}${event.target.value}`);
      });
    });
  }


}