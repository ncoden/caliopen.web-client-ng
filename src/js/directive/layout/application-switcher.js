export class LayoutApplicationSwitcherController {
  constructor($scope, $ngRedux, ApplicationHelper) {
    'ngInject';
    $scope.$on('$destroy', $ngRedux.connect(() => ({
      currentApplication: ApplicationHelper.getCurrentInfos().name,
    }))(this));
  }
}

export function LayoutApplicationSwitcherDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller: LayoutApplicationSwitcherController,
    controllerAs: 'ctrl',
    bindToController: true,
    /* eslint-disable max-len */
    template: `
      <li class="l-header__m-menu__item m-menu__item">
        <a ui-sref="front.discussions"
          class="l-header__m-menu__item-content m-menu__item-content"
          ng-class="{'is-active': (ctrl.currentApplication === 'discussions')}"
        >
          <i class="fa fa-envelope"></i>
          {{ 'header.menu.discussions'|translate}}
        </a>
      </li>
      <li class="l-header__m-menu__item m-menu__item">
        <a ui-sref="front.contacts"
          class="l-header__m-menu__item-content m-menu__item-content"
          ng-class="{'is-active': (ctrl.currentApplication === 'contacts')}"
        >
          <i class="fa fa-users"></i>
          {{ 'header.menu.contacts'|translate}}
        </a>
      </li>`,
    /* eslint-enable max-len */
  };
}
