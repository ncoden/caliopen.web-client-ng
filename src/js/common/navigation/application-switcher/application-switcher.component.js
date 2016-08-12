import { createSelector } from 'reselect';

const applicationSelector = createSelector(
  [
    (state, props) => props.ApplicationManager.getInfos(state.applicationReducer.applicationName),
  ],
  (applicationInfos) => ({
    currentApplication: { ...applicationInfos },
  })
);

export class ApplicationSwitcherController {
  constructor($scope, $ngRedux, $window, ApplicationManager) {
    'ngInject';
    this.$scope = $scope;
    this.$window = $window;
    this.ApplicationManager = ApplicationManager;
    this.$ngRedux = $ngRedux;
  }

  $onInit() {
    this.isDropdownOpen = false;
    this.$scope.$on('$destroy', this.$ngRedux.connect((state) => applicationSelector(state, {
      ApplicationManager: this.ApplicationManager,
    }))(this));
    this.applications = this.ApplicationManager.getApplications();
  }

  $postLink() {
    const $dropdown = angular.element('#co-application-switcher__dropdown');
    // eslint-disable-next-line no-new
    new this.$window.Foundation.Dropdown($dropdown, {
      // always overriden, see https://github.com/zurb/foundation-sites/pull/9019
      positionClass: 'right bottom',
      hOffset: 0,
    });

    $dropdown.on('show.zf.dropdown', () => {
      this.$scope.$apply(() => {
        this.isDropdownOpen = true;
      });
    });
    $dropdown.on('hide.zf.dropdown', () => {
      this.$scope.$apply(() => {
        this.isDropdownOpen = false;
      });
    });
  }

  isCurrentApplication(application) {
    return angular.equals(application, this.currentApplication);
  }
}

const ApplicationSwitcherComponent = {
  controller: ApplicationSwitcherController,
  /* eslint-disable max-len */
  template: `
    <span class="m-application-switcher m-navbar__item"
          ng-class="{'m-application-switcher--is-open': !!$ctrl.isDropdownOpen, 'm-navbar__item--is-active': ($ctrl.currentApplication.route|isState)}">
      <a ng-repeat="application in $ctrl.applications"
         ng-show="$ctrl.isCurrentApplication(application)"
         ui-sref="{{ application.route }}"
         class="m-tab__link"
      >
        <span class="fa" ng-class="application.icon"></span>
        {{ ('header.menu.' + application.name)|translate }}
      </a>
      <a href data-toggle="co-application-switcher__dropdown"
        class="dropdown-float-right m-application-switcher__toggler m-link m-link--button"
      >
        <span class="show-for-sr" aria-label>{{'application_switcher.action.choose'|translate}}</span>
        <span class="fa fa-caret-down"
              ng-class="{'fa-caret-down': !$ctrl.isDropdownOpen, 'fa-caret-up': !!$ctrl.isDropdownOpen}"
        ></span>
      </a>
      <ul id="co-application-switcher__dropdown"
        class="m-application-switcher__dropdown  m-menu bottom"
        data-close-on-click="true"
      >
        <li ng-repeat="application in $ctrl.applications"
            ng-show="!$ctrl.isCurrentApplication(application)"
            class="m-menu__item m-menu--vertical__item"
        >
          <a ui-sref="{{ application.route }}"
             class="m-menu__item-content m-link"
          >
            <i class="fa fa-envelope"></i>
            {{ ('header.menu.' + application.name)|translate}}
          </a>
        </li>
      </ul>
    </span>`,
  /* eslint-enable max-len */
};

export default ApplicationSwitcherComponent;
