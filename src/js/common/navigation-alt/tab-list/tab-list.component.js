import { createSelector } from 'reselect';

const tabsSelector = createSelector(
  state => state.tabReducer.tabs,
  (tabs) => ({ tabs })
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
    $ngRedux.dispatch(TabsActions.requestTabs());
  }

  remove(tab) {
    this.$ngRedux.dispatch(this.TabsActions.removeTab(tab));
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
        <nav-tab tab="tab"></nav-tab>

        <a href ng-click="$ctrl.remove(tab)" class="m-tab__button">
          <i class="fa fa-close"></i>
        </a>
      </li>
    </ul>`,
  /* eslint-enable max-len */
};

export default TabListComponent;
