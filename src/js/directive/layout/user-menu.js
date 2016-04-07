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
      <div class="l-header__m-menu__item m-menu__item">
        <button class="l-header__m-menu__item-content m-menu__item-content m-menu__item-content--link" type="button" data-toggle="user-menu-dropdown">
          <i class="fa fa-user"></i>
          <span class="show-for-small-only">{{ ctrl.user.name }}</span>
          <i class="fa fa-caret-down"></i>
        </button>

        <div class="m-dropdown"
          data-dropdown
          data-position-class="bottom"
          data-auto-focus="true"
          id="user-menu-dropdown"
        >
          <ul class="m-menu m-menu--break">
            <li class="m-menu__item m-menu--break__item show-for-medium">
              <div class="m-menu__item-content m-menu--break__item-content">
                {{ ctrl.user.name }}
              </div>
            </li>
            <li class="m-menu__separator m-menu--break__separator show-for-medium"></li>
            <li class="m-menu__item m-menu--break__item">
              <a class="m-menu__item-content m-menu--break__item-content m-menu__item-content--link" href="/auth/logout">
                {{'header.menu.signout'|translate}}
              </a>
            </li>
          </ul>
        </div>
      </div>`,
    /* eslint-enable max-len */
  };
}
