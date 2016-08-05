import { createSelector } from 'reselect';

const applicationSelector = createSelector(
  state => state.applicationReducer,
  (applicationReducer) => ({
    applicationName: applicationReducer.applicationName,
  })
);

const routerSelector = createSelector(
  state => state.router,
  payload => ({ currentStateName: payload.currentState.name })
);

class LayoutApplicationWrapperController {
  constructor($scope, $state, $ngRedux) {
    'ngInject';
    $scope.$on('$destroy', $ngRedux.connect(routerSelector)(this));
    $scope.$on('$destroy', $ngRedux.connect(applicationSelector)(this));
  }
}

export const LayoutApplicationWrapperComponent = {
  controller: LayoutApplicationWrapperController,
  /* eslint-disable max-len */
  template: `
    <section role="main">
      <div class="l-body">
        <div class="l-body__col-content">
          <div class="l-navbar m-navbar hide-for-small-only">
            <div class="l-navbar__application-switcher">
              <co-layout-navigation-application-switcher></co-layout-navigation-application-switcher>
            </div>
            <div class="l-navbar__tab-list">
              <co-layout-navigation-tab-list></co-layout-navigation-tab-list>
            </div>
            <div class="l-navbar__sliders-toggle">
              <co-layout-navigation-sliders-container></co-layout-navigation-sliders-container>
            </div>
          </div>
          <div class="l-body__content" ng-switch="$ctrl.currentStateName">
            <div ng-switch-when="front.discussions">
              <co-discussions></co-discussions>
            </div>
            <div ng-switch-when="front.thread">
              <co-thread></co-thread>
            </div>
            <div ng-switch-when="front.draft">
              <co-discussion-draft></co-discussion-draft>
            </div>
            <div ng-switch-when="front.contacts">
              <co-contact-list></co-contact-list>
            </div>
            <div ng-switch-when="front.contact">
              <co-contact></co-contact>
            </div>
          </div>
        </div>
      </div>

      <co-layout-call-to-action></co-layout-call-to-action>
      <co-layout-flash-message-list></co-layout-flash-message-list>
    </section>`,
  /* eslint-enable max-len */
};
