import {createSelector} from 'reselect';

const APPLICATION_DISCUSSIONS = 'discussions';
const APPLICATION_CONTACTS = 'contacts';

const applicationSelector = createSelector(
  state => state.applicationReducer,
  payload => {
    return {
      currentApplicationKey: `header.menu.${payload.name}`,
      currentApplicationRoute: payload.route
    };
  });

export class LayoutApplicationSwitcherController {
  constructor($scope, $state, $ngRedux, ApplicationActions) {
    'ngInject';
    this.$state = $state;
    this.$ngRedux = $ngRedux;
    this.ApplicationActions = ApplicationActions;
    $scope.$on('$destroy',$ngRedux.connect(applicationSelector)(this));
    this.selectApplication(this.getCurrentApplicationName());
  }

  selectApplication(name) {
    const application = this.getApplication(name);
    this.$ngRedux.dispatch(this.ApplicationActions.selectApplication(application));
    this.$state.go(application.route);
  }

  getApplication(name) {
    switch(name) {
      case APPLICATION_DISCUSSIONS:
        return {
          name: APPLICATION_DISCUSSIONS,
          route: 'front.discussions'
        };
      case APPLICATION_CONTACTS:
        return {
          name: APPLICATION_CONTACTS,
          route: 'front.contacts'
        };
    }
  }

  getCurrentApplicationName() {
    switch(true) {
      case (this.$state.includes('front.discussions')):
        return APPLICATION_DISCUSSIONS;
      case (this.$state.includes('front.contacts')):
        return APPLICATION_CONTACTS;
    }
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
