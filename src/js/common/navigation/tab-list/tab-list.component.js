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
    <div class="m-horizontal-scroll" horizontal-scroll>
      <a href horizontal-scroll-anchor="left"
        class="m-horizontal-scroll__anchor m-navbar__item m-navbar__content m-link m-link--button"
      >
        <span class="fa fa-arrow-left"></span>
      </a>
      <div class="m-horizontal-scroll__visible-zone m-navbar__item-container" horizontal-scroll-visible-zone>
        <ul horizontal-scroll-container
            class="m-menu m-horizontal-scroll__container"
        >
          <li ng-repeat="tab in $ctrl.tabs"
            class="m-tab m-navbar__item"
            ui-sref-active-eq="m-navbar__item--is-active"
          >
            <nav-tab tab="tab" link-stylesheet="m-navbar__content"></nav-tab>

            <a href ng-click="$ctrl.remove(tab)" class="m-tab__button m-navbar__content">
              <i class="fa fa-close"></i>
            </a>
          </li>
        </ul>
      </div>
      <a href horizontal-scroll-anchor="right"
        class="m-horizontal-scroll__anchor m-navbar__item m-navbar__content m-link m-link--button"
      >
        <span class="fa fa-arrow-right"></span>
      </a>
    </div>
  `,
  /* eslint-enable max-len */
};

export default TabListComponent;
