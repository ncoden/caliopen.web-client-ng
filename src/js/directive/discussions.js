import { createSelector } from 'reselect';

const threadsSelector = createSelector(
  state => state.threadReducer,
  payload => ({ threads: payload.threads })
);

export class DiscussionsController {
  constructor($scope, $ngRedux, DiscussionsActions) {
    'ngInject';
    $scope.$on('$destroy', $ngRedux.connect(threadsSelector)(this));
    $ngRedux.dispatch(DiscussionsActions.fetchThreads());
  }
}

export function DiscussionsDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller: DiscussionsController,
    controllerAs: 'ctrl',
    bindToController: true,
    /* eslint-disable max-len */
    template: `
      <div class="container-fluid co-list">
        <co-discussions-thread thread="thread" ng-repeat="thread in ctrl.threads"></co-discussions-thread>
      </div>`,
    /* eslint-enable max-len */
  };
}
