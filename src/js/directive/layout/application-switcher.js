export class LayoutApplicationSwitcherController {
  constructor($scope, $ngRedux, ApplicationHelper) {
    'ngInject';
    $scope.$on('$destroy', $ngRedux.connect(() => {
      let {name, route} = ApplicationHelper.getInfoForCurrentState();
      return {
        currentApplication: name,
      };
    })(this));
  }
}

export function LayoutApplicationSwitcherDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller: LayoutApplicationSwitcherController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <ul class="nav navbar-nav">
        <li ng-class="{active: (ctrl.currentApplication === 'discussions')}">
          <a ui-sref="front.discussions">
            <i class="fa fa-envelope"></i>
            {{ 'header.menu.discussions'|translate}}
          </a>
        </li>
        <li ng-class="{active: (ctrl.currentApplication === 'contacts')}">
          <a ui-sref="front.contacts">
            <i class="fa fa-users"></i>
            {{ 'header.menu.contacts'|translate}}
          </a>
        </li>
      </ul>`
  };
}
