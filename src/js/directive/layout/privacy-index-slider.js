class LayoutPrivacyIndexSliderController {
  constructor() {
    this.range = [0, 100];
    this.sliderOptions = {
      orientation: 'horizontal',
      range: true,
      /* eslint-disable */
      start: (event, ui) => {
        console.log('Slider start');
      },
      stop: (event, ui) => {
        console.log('Slider stop', this.range);
      }
      /* eslint-enable */
    };
  }
}

export function LayoutPrivacyIndexSliderDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller: LayoutPrivacyIndexSliderController,
    bindToController: true,
    controllerAs: 'ctrl',
    template: `
      <div class="co-layout__privacy-slider">
        <div ui-slider="ctrl.sliderOptions" ng-model="ctrl.range"></div>
      </div>`,
  };
}
