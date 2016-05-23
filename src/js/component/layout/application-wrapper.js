import { createSelector } from 'reselect';

const routerSelector = createSelector(
  state => state.router,
  payload => ({ currentStateName: payload.currentState.name })
);

class LayoutApplicationWrapperController {
  constructor($scope, $state, $ngRedux, ApplicationHelper) {
    'ngInject';
    $scope.$on('$destroy', $ngRedux.connect(routerSelector)(this));
    $scope.$on('$destroy', $ngRedux.connect(() => ({
      currentApplication: ApplicationHelper.getCurrentInfos().name,
    }))(this));
  }
}

export const LayoutApplicationWrapperComponent = {
  controller: LayoutApplicationWrapperController,
  /* eslint-disable max-len */
  template: `
    <section role="main">
      <div class="l-topbar">
        <div class="l-topbar__col-action" ng-switch="$ctrl.currentApplication">
          <a ng-switch-when="discussions"
            ui-sref="front.discussions.create"
            class="button"
            title="{{ 'header.menu.compose'|translate }}">
            <i class="fa fa-plus"></i>
            {{ 'header.menu.compose'|translate }}
          </a>
          <a ng-switch-when="contacts"
            ui-sref="front.contacts.create"
            class="button"
            title="{{ 'header.menu.compose'|translate }}">
            <i class="fa fa-plus"></i>
            {{ 'header.menu.create_user'|translate }}
          </a>
        </div>
        <div class="l-topbar__col-slider">
          <co-layout-privacy-index-slider></co-layout-privacy-index-slider>
        </div>
      </div>

      <div class="l-body">
        <div class="l-body__col-slider">
          <co-layout-importance-level-slider></co-layout-importance-level-slider>
        </div>
        <div class="l-body__col-content">
          <co-layout-tab-list></co-layout-tab-list>
          <div class="l-body__content" ng-switch="$ctrl.currentStateName">
            <div ng-switch-when="front.discussions">
              <co-discussions></co-discussions>
            </div>
            <div ng-switch-when="front.discussions.thread">
              <co-thread></co-thread>
            </div>
            <div ng-switch-when="front.contacts">
              <co-contact-list></co-contact-list>
            </div>
            <div ng-switch-when="front.contacts.contact">
              <co-contact></co-contact>
            </div>
          </div>
        </div>
      </div>

      <co-layout-flash-message-list></co-layout-flash-message-list>
    </section>`,
  /* eslint-enable max-len */
};
