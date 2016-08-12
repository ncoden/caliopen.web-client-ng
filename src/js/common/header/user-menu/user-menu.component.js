import { createSelector } from 'reselect';

const userSelector = createSelector(
  state => state.userReducer.user,
  user => ({ user })
);

export class UserMenuController {
  constructor($scope, $ngRedux, $window) {
    'ngInject';
    this.$window = $window;
    $scope.$on('$destroy', $ngRedux.connect(userSelector)(this));
  }

  $postLink() {
    // eslint-disable-next-line no-new
    new this.$window.Foundation.Dropdown(angular.element('#co-user-menu__dropdown'), {});
  }
}

const UserMenuComponent = {
  controller: UserMenuController,
  /* eslint-disable max-len */
  template: `
    <div>
      <a class="l-header__m-link m-link m-link--button float-right"
        data-toggle="co-user-menu__dropdown"
      >
        <i class="fa fa-user"></i>
        <span class="show-for-small-only">{{ $ctrl.user.name }}</span>
        <i class="fa fa-caret-down"></i>
      </a>

      <ul class="l-header__m-menu m-dropdown m-menu bottom"
        data-close-on-click="true"
        id="co-user-menu__dropdown"
      >
        <li class="l-header__m-menu__item m-menu__item m-menu--vertical__item">
          <div class="l-header__m-menu__item-content m-menu__item-content">
            {{ $ctrl.user.name }}
          </div>
        </li>
        <li class="m-menu__separator show-for-medium"></li>
        <li class="l-header__m-menu__item m-menu__item m-menu--vertical__item">
          <a
            class="l-header__m-menu__item-content m-menu__item-content m-link"
            href="/auth/logout"
          >
            {{'header.menu.signout'|translate}}
          </a>
        </li>
      </ul>
    </div>`,
  /* eslint-enable max-len */
};

export default UserMenuComponent;
