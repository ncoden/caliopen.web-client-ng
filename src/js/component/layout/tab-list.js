import { createSelector } from 'reselect';
import { stateGo } from 'redux-ui-router';

const tabsSelector = createSelector(
  state => state.tabReducer.tabs,
  state => state.tabReducer.selected,
  (tabs, selectedTab) => ({ tabs, selectedTab })
);

const userSelector = createSelector(
  state => state.userReducer.user,
  user => ({ user })
);

const APPLICATION_ICONS = {
  discussions: 'fa-comments',
  contacts: 'fa-users',
};

export class LayoutTabListController {
  constructor($scope, $state, $ngRedux, TabsActions, ApplicationHelper) {
    'ngInject';
    this.$state = $state;
    this.$ngRedux = $ngRedux;
    this.TabsActions = TabsActions;
    $scope.$on('$destroy', $ngRedux.connect(() => {
      const { name, route } = ApplicationHelper.getCurrentInfos();

      return {
        currentApplicationIcon: APPLICATION_ICONS[name],
        currentApplicationKey: `header.menu.${name}`,
        currentApplicationRoute: route,
      };
    })(this));
    $scope.$on('$destroy', $ngRedux.connect(tabsSelector)(this));
    $scope.$on('$destroy', $ngRedux.connect(userSelector)(this));
    $ngRedux.dispatch(TabsActions.requestTabs());
  }

  remove(tab) {
    this.$ngRedux.dispatch(this.TabsActions.removeTab(tab));
  }

  selectCurrentApplication() {
    return this.$ngRedux.dispatch(stateGo(this.currentApplicationRoute));
  }

  getThread(threadId) {
    return this.$ngRedux.getState().threadReducer.threadsById[threadId];
  }

  getContact(contactId) {
    return this.$ngRedux.getState().contactReducer.contactsById[contactId];
  }
}

export const LayoutTabListComponent = {
  controller: LayoutTabListController,
  /* eslint-disable max-len */
  template: `
    <ul class="m-menu">
      <li class="m-menu__item m-tab"
        ng-class="{ 'is-active': ($ctrl.currentApplicationRoute | isState) }">
        <a href ng-click="$ctrl.selectCurrentApplication()"
          class="m-tab__link"
        >
          <i class="fa" ng-class="$ctrl.currentApplicationIcon"></i>
          {{ $ctrl.currentApplicationKey | translate }}
        </a>
      </li>

      <li ng-repeat="tab in $ctrl.tabs"
        class="m-menu__item m-tab"
        ui-sref-active-eq="is-active"
      >
        <span ng-switch="tab.type">
          <a ng-switch-when="thread"
            ui-sref="front.discussions.thread({ threadId: tab.item.thread_id })"
            title="{{$ctrl.getThread(tab.item.thread_id)|threadContacts:$ctrl.user}}"
            class="m-tab__link"
          >
            <i class="fa fa-comments-o"></i>
            {{$ctrl.getThread(tab.item.thread_id)|threadContacts:$ctrl.user|limitTo:200}}
          </a>

          <a ng-switch-when="contact"
            ui-sref="front.contacts.contact({ contactId: tab.item.contact_id })"
            title="{{$ctrl.getContact(tab.item.contact_id).title}}"
            class="m-tab__link"
          >
            <i class="fa fa-user"></i>
            {{$ctrl.getContact(tab.item.contact_id).title|limitTo:200}}
          </a>
        </span>

        <a href ng-click="$ctrl.remove(tab)" class="m-tab__button">
          <i class="fa fa-close"></i>
        </a>
      </li>
    </ul>`,
  /* eslint-enable max-len */
};
