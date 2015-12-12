import {createSelector} from 'reselect';

const threadsSelector = createSelector(
  state => state.threadReducer,
  payload => {
    return { threads: payload.threads };
  });

class DiscussionsController {
  /*@ngInject*/
  constructor($scope, $ngRedux, DiscussionsActions) {
    $scope.$on('$destroy',$ngRedux.connect(threadsSelector)(this));
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
    template: `
      <div class="container-fluid">
        <co-discussions-thread thread="thread" ng-repeat="thread in ctrl.threads"></co-discussions-thread>
      </div>`
  };
}

exports.DiscussionsController = DiscussionsController;
