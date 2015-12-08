export class DiscussionsController {
  /*@ngInject*/
  constructor($scope, $ngRedux, DiscussionsActions) {
    this.mapStateToThis($ngRedux.getState());
    const unsubscribe = $ngRedux.subscribe(() => this.mapStateToThis($ngRedux.getState()));
    $scope.$on('$destroy', unsubscribe);

    //init
    $ngRedux.dispatch(DiscussionsActions.fetchThreads());
  }

  mapStateToThis(state) {
    if (state.threadReducer.isFetching === false && !!state.threadReducer.threads) {
      this.threads = state.threadReducer.threads;
    }
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
