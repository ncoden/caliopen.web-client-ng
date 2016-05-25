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

export class TabListController {
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
