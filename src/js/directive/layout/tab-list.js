import { createSelector } from 'reselect';
import { stateGo } from 'redux-ui-router';

const tabsSelector = createSelector(
  state => state.tabReducer.tabs,
  state => state.tabReducer.selected,
  (tabs, selectedTabId) => ({ tabs, selectedTabId })
);

export class LayoutTabListController {
  constructor($scope, $state, $ngRedux, TabsActions, ApplicationHelper) {
    'ngInject';
    this.$state = $state;
    this.$ngRedux = $ngRedux;
    this.TabsActions = TabsActions;
    $scope.$on('$destroy', $ngRedux.connect(() => {
      const { name, route } = ApplicationHelper.getCurrentInfos();

      return {
        currentApplicationKey: `header.menu.${name}`,
        currentApplicationRoute: route,
      };
    })(this));
    $scope.$on('$destroy', $ngRedux.connect(tabsSelector)(this));
    $ngRedux.dispatch(TabsActions.requestTabs());
  }

  remove(tab) {
    this.$ngRedux.dispatch((dispatch) => {
      dispatch(this.TabsActions.removeTab(tab));
      if (this.isActive(tab)) {
        dispatch(stateGo(this.currentApplicationRoute));
      }
    });
  }

  select(tab) {
    return this.$ngRedux.dispatch(dispatch => {
      dispatch(this.TabsActions.selectTab(tab));
      dispatch(stateGo(tab.route, tab.routeOpts));
    });
  }

  selectCurrentApplication() {
    return this.$ngRedux.dispatch(stateGo(this.currentApplicationRoute));
  }

  isActive(tab) {
    return tab.id === this.selectedTabId;
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
      <ul class="co-layout__tabs">
        <li class="co-layout__tabs__item">
          <a href ng-click="ctrl.selectCurrentApplication()"
             ng-class="{ 'co-layout__tabs__item__link--active': (ctrl.currentApplicationRoute | isState) }"
             class="co-layout__tabs__item__link co-layout__tabs__item__link--first">
            {{ ctrl.currentApplicationKey | translate }}
          </a>
        </li>
        <li ng-repeat="tab in ctrl.tabs" class="co-layout__tabs__item">
          <a href ng-click="ctrl.select(tab)"
             ng-class="{ 'co-layout__tabs__item__link--active': ctrl.isActive(tab) }"
             class="co-layout__tabs__item__link">
            {{tab.label | limitTo:200}}
          </a>
          <a href ng-click="ctrl.remove(tab)" class="co-layout__tabs__item__del-btn">
            <i class="fa fa-close"></i>
          </a>
        </li>
      </ul>`,
    /* eslint-enable max-len */
  };
}
