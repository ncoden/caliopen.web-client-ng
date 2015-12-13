import {createSelector} from 'reselect';

const tabsSelector = createSelector(
  state => state.tabReducer,
  tabs => ({ tabs })
);

const applicationSelector = createSelector(
  state => state.applicationReducer,
  payload => {
    return {
      currentApplicationKey: `header.menu.${payload.name}`,
      currentApplicationRoute: payload.route
    }
  });

export class LayoutTabListController {
  /*@ngInject*/
  constructor($scope, $state, $ngRedux, TabsActions) {
    this.$state = $state;
    this.$ngRedux = $ngRedux;
    this.TabsActions = TabsActions;
    $scope.$on('$destroy', $ngRedux.connect(applicationSelector)(this));
    $scope.$on('$destroy', $ngRedux.connect(tabsSelector)(this));
    $ngRedux.dispatch(TabsActions.requestTabs());
  }

  remove(tab) {
    this.$ngRedux.dispatch(this.TabsActions.removeTab(tab));
  }

  select(tab) {
    return this.$state.go(tab.route, tab.routeOpts);
  }

  isActive(tab) {
    return this.$state.is(tab.route, tab.routeOpts);
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
    template: `
      <ul class="caliopen-layout__tabs">
        <li class="caliopen-layout__tabs__item">
          <a ng-if="ctrl.currentApplicationRoute" ui-sref="{{ ctrl.currentApplicationRoute }}" ui-sref-active-eq="caliopen-layout__tabs__item__link--active"
             class="caliopen-layout__tabs__item__link caliopen-layout__tabs__item__link--first">
            {{ ctrl.currentApplicationKey | translate }}
          </a>
        </li>
        <li ng-repeat="tab in ctrl.tabs" class="caliopen-layout__tabs__item">
          <a href ng-click="ctrl.select(tab)"
             ng-class="{ 'caliopen-layout__tabs__item__link--active': ctrl.isActive(tab) }"
             class="caliopen-layout__tabs__item__link">
            {{tab.label | limitTo:200}}
          </a>
          <a href ng-click="ctrl.remove(tab)" class="caliopen-layout__tabs__item__del-btn">
            <i class="fa fa-close"></i>
          </a>
        </li>
      </ul>
    `
  };
}
