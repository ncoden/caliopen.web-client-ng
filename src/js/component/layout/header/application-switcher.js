export class LayoutApplicationSwitcherController {
  constructor($scope, $ngRedux, ApplicationHelper, $window) {
    'ngInject';
    this.$window = $window;
    $scope.$on('$destroy', $ngRedux.connect(() => ({
      currentApplication: ApplicationHelper.getCurrentInfos().name,
    }))(this));
  }

  $postLink() {
    // eslint-disable-next-line no-new
    new this.$window.Foundation.Dropdown(angular.element('#co-application-switcher__dropdown'), {});
  }
}

export const LayoutApplicationSwitcherComponent = {
  controller: LayoutApplicationSwitcherController,
  /* eslint-disable max-len */
  template: `
    <div>
      <a href data-toggle="co-application-switcher__dropdown"
        class="l-header__m-link m-link m-link--button"
      >
        {{ ('header.menu.' + $ctrl.currentApplication)|translate}}
        <i class="fa fa-caret-down"></i>
      </a>
      <ul id="co-application-switcher__dropdown"
        class="l-header__m-menu m-dropdown m-menu"
        data-close-on-click="true"
      >
        <li class="l-header__m-menu__item m-menu__item m-menu--vertical__item">
          <a ui-sref="front.discussions"
            class="l-header__m-menu__item-content m-menu__item-content m-link"
            ng-class="{'is-active': ($ctrl.currentApplication === 'discussions')}"
          >
            <i class="fa fa-envelope"></i>
            {{ 'header.menu.discussions'|translate}}
          </a>
        </li>
        <li class="l-header__m-menu__item m-menu__item m-menu--vertical__item">
          <a ui-sref="front.contacts"
            class="l-header__m-menu__item-content m-menu__item-content m-link"
            ng-class="{'is-active': ($ctrl.currentApplication === 'contacts')}"
          >
            <i class="fa fa-users"></i>
            {{ 'header.menu.contacts'|translate}}
          </a>
        </li>
      </ul>
    </div>`,
  /* eslint-enable max-len */
};
