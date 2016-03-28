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
      <span class="m-menu__item dropdown">
        <a href class="m-menu__item-content dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-label="{{'header.menu.account'|translate}}">
          <i class="fa fa-user"></i>
          <span class="visible-xs-inline">{{ ctrl.user.name }}</span>
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu" role="menu">
          <li class="dropdown-header hidden-xs">{{ ctrl.user.name }}</li>
          <li class="divider"></li>
          <li>
            <a href="/auth/logout">
              {{'header.menu.signout'|translate}}
            </a>
          </li>
        </ul>
      </span>`,
    /* eslint-enable max-len */
  };
}
