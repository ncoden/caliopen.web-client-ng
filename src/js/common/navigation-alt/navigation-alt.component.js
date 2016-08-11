import { createSelector } from 'reselect';

const userSelector = createSelector(
  state => state.userReducer.user,
  user => ({ user })
);

const applicationSelector = createSelector(
  (state, props) => props.ApplicationManager.getInfos(state.applicationReducer.applicationName),
  (currentApplication) => ({ currentApplication })
);

class NavigationAltController {
  constructor($scope, $ngRedux, ApplicationManager) {
    'ngInject';
    this.$ngRedux = $ngRedux;
    this.ApplicationManager = ApplicationManager;
    $scope.$on('$destroy', $ngRedux.connect((state) => applicationSelector(state, {
      ApplicationManager,
    }))(this));
    $scope.$on('$destroy', $ngRedux.connect(userSelector)(this));
  }

  $onInit() {
    this.applications = this.ApplicationManager.getApplications();
  }

  isCurrentApplication(application) {
    return angular.equals(application, this.currentApplication);
  }
}

const NavigationAltComponent = {
  controller: NavigationAltController,
  /* eslint-disable max-len */
  template: `
    <div class="l-nav-alt">
      <div class="l-nav-alt__user">
        <div class="l-nav-alt__avatar">
          <avatar-letter ng-if="$ctrl.user.contact" contact="$ctrl.user.contact"></avatar-letter>
        </div>
        <div class="l-nav-alt__user-name">
          <div>{{ $ctrl.user.contact.title }}</div>
          <div>{{ $ctrl.user.name }}</div><!-- FIXME: use contact address https://github.com/CaliOpen/Caliopen/issues/26 -->
        </div>
      </div>
      <ul class="m-menu">
        <li ng-repeat="application in $ctrl.applications"
            class="m-menu__item m-menu--vertical__item"
        >
          <a ui-sref="{{ application.route }}"
            class="m-menu__item-content m-link"
            ng-class="{'is-active': $ctrl.isCurrentApplication(application)}"
          >
            <i class="fa fa-envelope"></i>
            {{ ('header.menu.' + application.name)|translate }}
          </a>
        </li>
      </ul>
      <tab-list-alt></tab-list-alt>
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

export default NavigationAltComponent;
