import { SLIDER_START, SLIDER_STOP } from './sliders.component.js';

export class SlidersContainerController {
  constructor($window, $timeout) {
    'ngInject';
    this.$window = $window;
    this.$timeout = $timeout;
  }

  $postLink() {
    const $dropdown = angular.element('#co-navbar-slider__dropdown');
    const zfDropdown = new this.$window.Foundation.Dropdown($dropdown, {});
    const $body = angular.element(this.$window.document.body);
    this.addDropdownHandle($body, zfDropdown);

    this.preventCloseDropdown = ({ type }) => {
      switch (type) {
        case SLIDER_START:
          $body.off('click.zf.dropdown');
          break;
        case SLIDER_STOP:
        default:
          this.addBodyHandler($body, zfDropdown);
      }
    };
  }

  addDropdownHandle($body, zfDropdown) {
    zfDropdown.$element.on('show.zf.dropdown', () => {
      this.addBodyHandler($body, zfDropdown);
    });
  }

  addBodyHandler($body, zfDropdown) {
    $body.off('click.zf.dropdown')
         .on('click.zf.dropdown', (e) => {
           if (zfDropdown.$anchor.is(e.target) || zfDropdown.$anchor.find(e.target).length) {
             return;
           }
           if (zfDropdown.$element.is(e.target) || zfDropdown.$element.find(e.target).length) {
             return;
           }
           zfDropdown.close();
           $body.off('click.zf.dropdown');
         });
  }
}

const SlidersContainerComponent = {
  controller: SlidersContainerController,
  /* eslint-disable max-len */
  template: `
    <a class="m-link m-link--button m-navbar__item m-navbar__content dropdown-float-right"
       aria-label="{{ 'settings.action.toggle_filter_sliders'|translate }}"
       data-toggle="co-navbar-slider__dropdown"
    >
      <span class="fa fa-warning m-text--importance"></span>
      <span class="fa fa-shield m-text--privacy"></span>
    </a>
    <div class="m-dropdown bottom"
         id="co-navbar-slider__dropdown"
         data-close-on-click="false"
    >
      <sliders on-slider-event="$ctrl.preventCloseDropdown($event)"></sliders>
    </div>
  `,
  /* eslint-enable max-len */
};

export default SlidersContainerComponent;
