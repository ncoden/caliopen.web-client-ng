function getTemplate(type) {
  return `
    <div class="m-slider m-slider--${type} l-navbar__slider">
      <span class="m-slider__full-bar m-slider--${type}__full-bar"></span>
      <span class="m-slider__range m-slider--${type}__range"></span>
      <ul ng-show="showTicks" class="m-slider__tick-list">
        <li ng-repeat="t in ticks track by $index" class="m-slider__tick"></li>
      </ul>
      <span class="m-slider__handle m-slider__handle--bottom" ng-style=minPointerStyle></span>
      <span class="m-slider__handle m-slider__handle--top" ng-style=maxPointerStyle></span>
    </div>
  `;
}

function sliderConfig($templateCache) {
  'ngInject';
  ['privacy', 'importance'].forEach(type => {
    $templateCache.put(`caliopen/slider.${type}.html.tpl`, getTemplate(type));
  });
}

export default sliderConfig;
