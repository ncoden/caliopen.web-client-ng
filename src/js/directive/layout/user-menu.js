import { createSelector } from 'reselect';

const userSelector = createSelector(
  state => state.userReducer.user,
  user => ({ user })
);

export class LayoutUserMenuController {
  constructor($scope, $ngRedux, UserActions) {
    'ngInject';
    $scope.$on('$destroy', $ngRedux.connect(userSelector)(this));
    $ngRedux.dispatch(UserActions.fetchUser());
  }
}

export function LayoutUserMenuDirective() {
  return {
    restrict: 'E',
    scope: {
    },
    controller: LayoutUserMenuController,
    controllerAs: 'ctrl',
    bindToController: true,
    /* eslint-disable max-len */
    template: `
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
          <a href class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-label="{{'header.menu.account'|translate}}">
            <i class="fa fa-user"></i>
            <span class="visible-xs-inline">{{ ctrl.user.username }}</span>
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu" role="menu">
            <li class="dropdown-header hidden-xs">{{ ctrl.user.username }}</li>
            <li class="divider"></li>
            <li>
              <a href="/auth/logout">
                {{'header.menu.signout'|translate}}
              </a>
            </li>
          </ul>
        </li>
      </ul>`,
    /* eslint-enable max-len */
  };
}
