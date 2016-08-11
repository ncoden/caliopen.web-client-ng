import { createSelector } from 'reselect';

const tabsSelector = createSelector(
  state => state.tabReducer.tabs,
  (tabs) => ({ tabs })
);

const userSelector = createSelector(
  state => state.userReducer.user,
  user => ({ user })
);

const applicationSelector = createSelector(
  [
    (state, props) => props.ApplicationManager.getInfos(state.applicationReducer.applicationName),
  ],
  (applicationInfos) => ({
    application: { ...applicationInfos },
  })
);

export class TabListController {
  constructor($scope, $state, $ngRedux, TabsActions, ApplicationManager) {
    'ngInject';
    this.$state = $state;
    this.$ngRedux = $ngRedux;
    this.TabsActions = TabsActions;
    $scope.$on('$destroy', $ngRedux.connect((state) => applicationSelector(state, {
      ApplicationManager,
    }))(this));
    $scope.$on('$destroy', $ngRedux.connect(tabsSelector)(this));
    $scope.$on('$destroy', $ngRedux.connect(userSelector)(this));
    $ngRedux.dispatch(TabsActions.requestTabs());
  }

  remove(tab) {
    this.$ngRedux.dispatch(this.TabsActions.removeTab(tab));
  }

  getThread(threadId) {
    return this.$ngRedux.getState().threadReducer.threadsById[threadId];
  }

  getContact(contactId) {
    return this.$ngRedux.getState().contactReducer.contactsById[contactId];
  }
}

const TabListComponent = {
  controller: TabListController,
  /* eslint-disable max-len */
  template: `
    <ul class="m-menu">
      <li ng-repeat="tab in $ctrl.tabs"
        class="m-menu__item m-menu--vertical__item"
        ui-sref-active-eq="m-menu__item--is-active"
      >
        <span ng-switch="tab.type">
          <a ng-switch-when="thread"
            ui-sref="thread({ threadId: tab.item.thread_id })"
            title="{{$ctrl.getThread(tab.item.thread_id)|threadContacts:$ctrl.user}}"
            class="m-tab__link"
          >
            <i class="fa fa-comments-o"></i>
            {{$ctrl.getThread(tab.item.thread_id)|threadContacts:$ctrl.user|limitTo:200}}
          </a>

          <a ng-switch-when="contact"
            ui-sref="contact({ contactId: tab.item.contact_id })"
            title="{{$ctrl.getContact(tab.item.contact_id).title}}"
            class="m-tab__link"
          >
            <i class="fa fa-user"></i>
            {{$ctrl.getContact(tab.item.contact_id).title|limitTo:200}}
          </a>
          <a ng-switch-when="draft-message"
            ui-sref="discussion-draft({ messageId: tab.item.message_id })"
            class="m-tab__link"
          >
            <i class="fa fa-envelope-o"></i>
            {{'messages.compose.title'|translate}}
          </a>
        </span>

        <a href ng-click="$ctrl.remove(tab)" class="m-tab__button">
          <i class="fa fa-close"></i>
        </a>
      </li>
    </ul>`,
  /* eslint-enable max-len */
};

export default TabListComponent;
