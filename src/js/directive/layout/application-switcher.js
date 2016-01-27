export class LayoutApplicationSwitcherController {
  constructor($scope, $ngRedux, ApplicationHelper) {
    'ngInject';
    $scope.$on('$destroy', $ngRedux.connect(() => {
      let {name, route} = ApplicationHelper.getInfoForCurrentState();
      return {
        currentApplicationKey: `header.menu.${name}`,
        currentApplicationRoute: route
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
        <li class="dropdown">
          <a href class="dropdown-toggle" data-toggle="dropdown"
             role="button" aria-haspopup="true" aria-expanded="false">
            {{ctrl.currentApplicationKey | translate}} <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li>
              <a ui-sref="front.discussions">
                <i class="fa fa-envelope"></i>
                {{ 'header.menu.discussions'|translate}}
              </a>
            </li>
            <li>
              <a ui-sref="front.contacts">
                <i class="fa fa-users"></i>
                {{ 'header.menu.contacts'|translate}}
              </a>
            </li>
          </ul>
        </li>
      </ul>`
  };
}
