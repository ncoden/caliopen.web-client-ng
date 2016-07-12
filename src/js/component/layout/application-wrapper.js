import { createSelector } from 'reselect';
import { stateGo } from 'redux-ui-router';
import { v1 as uuidV1 } from 'uuid';

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
  constructor($scope, $state, $ngRedux, ApplicationHelper, TabsActions, DraftMessageActions) {
    'ngInject';
    this.$ngRedux = $ngRedux;
    this.TabsActions = TabsActions;
    this.DraftMessageActions = DraftMessageActions;
    $scope.$on('$destroy', $ngRedux.connect(routerSelector)(this));
    $scope.$on('$destroy', $ngRedux.connect(applicationSelector)(this));
  }

  draftMessage() {
    const messageId = uuidV1();
    this.$ngRedux.dispatch((dispatch) => {
      dispatch(this.DraftMessageActions.createDraftMessage(messageId));
      const tab = {
        type: 'draft-message',
        item: {
          message_id: messageId,
        },
      };
      dispatch(this.TabsActions.selectOrAdd(tab));
      dispatch(stateGo('front.draft', { messageId }));
    });
  }
}

export const LayoutApplicationWrapperComponent = {
  controller: LayoutApplicationWrapperController,
  /* eslint-disable max-len */
  template: `
    <section role="main">
      <div class="l-topbar">
        <div class="l-topbar__col-action" ng-switch="$ctrl.applicationName">
          <a ng-switch-when="discussions"
            ng-click="$ctrl.draftMessage()"
            class="button"
            title="{{ 'header.menu.compose'|translate }}">
            <i class="fa fa-plus"></i>
            {{ 'header.menu.compose'|translate }}
          </a>
          <a ng-switch-when="contacts"
            ui-sref="front.create"
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
          <co-layout-navigation-tab-list></co-layout-navigation-tab-list>
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

      <co-layout-flash-message-list></co-layout-flash-message-list>
    </section>`,
  /* eslint-enable max-len */
};
