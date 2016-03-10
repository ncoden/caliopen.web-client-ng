class LayoutImportanceLevelSliderController {
  constructor() {
    this.range = [0, 100];
    this.sliderOptions = {
      orientation: 'vertical',
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

export function LayoutImportanceLevelSliderDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller: LayoutImportanceLevelSliderController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <div class="co-layout__importance-slider">
        <div ui-slider="ctrl.sliderOptions" ng-model="ctrl.range"></div>
      </div>`,
  };
}
