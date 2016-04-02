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

export function LayoutTabListDirective() {
  return {
    restrict: 'E',
    scope: {
    },
    controller: LayoutTabListController,
    controllerAs: 'ctrl',
    bindToController: true,
    /* eslint-disable max-len */
    template: `
      <ul class="l-body__tabs m-tabs">
        <li class="m-tabs__item">
          <a href ng-click="ctrl.selectCurrentApplication()"
            ng-class="{ 'is-active': (ctrl.currentApplicationRoute | isState) }"
            class="m-tabs__item__content"
          >
            <i class="fa" ng-class="ctrl.currentApplicationIcon"></i>
            {{ ctrl.currentApplicationKey | translate }}
          </a>
        </li>

        <li ng-repeat="tab in ctrl.tabs" class="m-tabs__item">
          <span ng-switch="tab.type">
            <a ng-switch-when="thread"
              ui-sref="front.discussions.thread({ threadId: tab.item.thread_id })"
              ui-sref-active-eq="is-active"
              title="{{ctrl.getThread(tab.item.thread_id)|threadContacts:ctrl.user}}"
              class="m-tabs__item__content m-tabs__item__content--with-btn"
            >
              <i class="fa fa-comments-o"></i>
              {{ctrl.getThread(tab.item.thread_id)|threadContacts:ctrl.user|limitTo:200}}
            </a>

            <a ng-switch-when="contact"
              ui-sref="front.contacts.contact({ contactId: tab.item.contact_id })"
              ui-sref-active-eq="is-active"
              title="{{ctrl.getContact(tab.item.contact_id).title}}"
              class="m-tabs__item__content m-tabs__item__content--with-btn"
            >
              <i class="fa fa-user"></i>
              {{ctrl.getContact(tab.item.contact_id).title|limitTo:200}}
            </a>
          </span>

          <a href ng-click="ctrl.remove(tab)" class="m-tabs__item__btn">
            <i class="fa fa-close"></i>
          </a>
        </li>
      </ul>`,
    /* eslint-enable max-len */
  };
}
