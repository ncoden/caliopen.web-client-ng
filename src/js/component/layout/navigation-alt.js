import { createSelector } from 'reselect';

const userSelector = createSelector(
  state => state.userReducer.user,
  user => ({ user })
);

class NavigationAltController {
  constructor($scope, $ngRedux, ApplicationHelper) {
    'ngInject';
    $scope.$on('$destroy', $ngRedux.connect(() => ({
      currentApplication: ApplicationHelper.getCurrentInfos().name,
    }))(this));
    $scope.$on('$destroy', $ngRedux.connect(userSelector)(this));
  }
}

export const LayoutNavigationAltComponent = {
  controller: NavigationAltController,
  /* eslint-disable max-len */
  template: `
    <div class="l-nav-alt">
      <div class="l-nav-alt__user">
        <div class="l-nav-alt__avatar">
          <co-avatar-letter ng-if="$ctrl.user.contact" contact="$ctrl.user.contact"></co-avatar-letter>
        </div>
        <div class="l-nav-alt__user-name">
          <div>{{ $ctrl.user.contact.title }}</div>
          <div>{{ $ctrl.user.name }}</div><!-- FIXME: use contact address https://github.com/CaliOpen/Caliopen/issues/26 -->
        </div>
      </div>
      <ul class="m-menu">
        <li class="m-menu__item m-menu--vertical__item">
          <a ui-sref="front.discussions"
            class="m-menu__item-content m-link"
            ng-class="{'is-active': ($ctrl.currentApplication === 'discussions')}"
          >
            <i class="fa fa-envelope"></i>
            {{ 'header.menu.discussions'|translate}}
          </a>
        </li>
        <li class="m-menu__item m-menu--vertical__item">
          <a ui-sref="front.contacts"
            class="m-menu__item-content m-link"
            ng-class="{'is-active': ($ctrl.currentApplication === 'contacts')}"
          >
            <i class="fa fa-users"></i>
            {{ 'header.menu.contacts'|translate}}
          </a>
        </li>
      </ul>
      <co-layout-navigation-alt-tab-list></co-layout-navigation-alt-tab-list>
      <ul class="m-menu">
        <li class="m-menu__item m-menu--vertical__item">
          <a
            class="m-menu__item-content m-link"
            href="/auth/logout"
          >
            {{'header.menu.signout'|translate}}
          </a>
        </li>
      </ul>
    </div>
  `,
};
