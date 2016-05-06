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

export const LayoutPrivacyIndexSliderComponent = {
  controller: LayoutPrivacyIndexSliderController,
  template: `
    <div class="l-topbar__slider">
      <div ui-slider="$ctrl.sliderOptions" ng-model="$ctrl.range"></div>
    </div>`,
};
