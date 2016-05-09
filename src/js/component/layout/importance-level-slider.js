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

export const LayoutImportanceLevelSliderComponent = {
  controller: LayoutImportanceLevelSliderController,
  template: `
    <div class="l-body__slider">
      <div ui-slider="$ctrl.sliderOptions" ng-model="$ctrl.range"></div>
    </div>`,
};
