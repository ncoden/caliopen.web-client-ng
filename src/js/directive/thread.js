class ThreadController {
  /* @ngInject */
  constructor($scope, $state, $ngRedux, DiscussionsActions) {
    this.threadId = $state.params.threadId;
    this.mapStateToThis($ngRedux.getState());
    const unsubscribe = $ngRedux.subscribe(() => this.mapStateToThis($ngRedux.getState()));
    $scope.$on('$destroy', unsubscribe);

    //init
    $ngRedux.dispatch(DiscussionsActions.fetchMessages(this.threadId));
  }

  mapStateToThis(state) {
    if (state.threadReducer.isFetching === false && !!state.threadReducer[this.threadId]) {
      this.messages = state.threadReducer[this.threadId].messages;
    }
  }
}

export function ThreadDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller: ThreadController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <div class="container-fluid">
        <co-thread-message ng-repeat="message in ctrl.messages" message="message"></co-thread-message>
      </div>`
  };
}
