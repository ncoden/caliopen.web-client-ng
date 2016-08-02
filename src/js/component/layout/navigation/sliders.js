import { createSelector } from 'reselect';

export const SLIDER_START = 'SLIDER_START';
export const SLIDER_STOP = 'SLIDER_STOP';

const apiFiltersSelector = createSelector(
  [
    state => state.apiFiltersReducer.privacyIndexRange,
    state => state.apiFiltersReducer.importanceLevelRange,
  ],
  (privacyIndexRange, importanceLevelRange) => ({ privacyIndexRange, importanceLevelRange })
);

class LayoutNavigationSlidersController {
  constructor($scope, $ngRedux, ApiFiltersActions) {
    'ngInject';
    this.$ngRedux = $ngRedux;
    this.$scope = $scope;
    this.ApiFiltersActions = ApiFiltersActions;
    $scope.$on('$destroy', $ngRedux.connect(apiFiltersSelector)(this));

    const sliderOptions = {
      floor: 0,
      ceil: 100,
      vertical: true,
      showTicks: 10,
      onStart: ({ ...args }) => {
        this.onSliderEvent({ $event: { type: SLIDER_START, ...args } });
      },
    };

    this.sliderImportanceOptions = {
      ...sliderOptions,
      onEnd: (sliderId, min, max) => {
        if (min !== this.importanceLevelRange.min || max !== this.importanceLevelRange.max) {
          this.$ngRedux.dispatch(this.ApiFiltersActions.updateImportanceLevelRange({ min, max }));
        }
        this.onSliderEvent({ $event: { type: SLIDER_STOP, sliderId, min, max } });
      },
    };

    this.sliderPrivacyOptions = {
      ...sliderOptions,
      onEnd: (sliderId, min, max) => {
        if (min !== this.privacyIndexRange.min || max !== this.privacyIndexRange.max) {
          this.$ngRedux.dispatch(this.ApiFiltersActions.updatePrivacyIndexRange({ min, max }));
        }
        this.onSliderEvent({ $event: { type: SLIDER_STOP, sliderId, min, max } });
      },
    };
  }
}

export const LayoutNavigationSlidersComponent = {
  controller: LayoutNavigationSlidersController,
  bindings: {
    onSliderEvent: '&',
  },
  template: `
    <div class="l-navbar__sliders-container">
      <rzslider
        rz-slider-min="$ctrl.importanceLevelRange.min"
        rz-slider-max="$ctrl.importanceLevelRange.max"
        rz-slider-tpl-url="caliopen/slider.importance.html.tpl"
        rz-slider-options="$ctrl.sliderImportanceOptions"></rzslider>

      <rzslider
        rz-slider-min="$ctrl.privacyIndexRange.min"
        rz-slider-max="$ctrl.privacyIndexRange.max"
        rz-slider-tpl-url="caliopen/slider.privacy.html.tpl"
        rz-slider-options="$ctrl.sliderPrivacyOptions"></rzslider>
    </div>
  `,
};
