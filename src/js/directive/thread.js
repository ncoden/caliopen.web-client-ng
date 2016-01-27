import {createSelector} from 'reselect';

const threadSelector = createSelector(
  state => state.threadReducer,
  state => state.threadReducer.selectedThread,
  (threadState, threadId) => {
    if (!!threadState[threadId]) {
      return { messages: threadState[threadId].messages };
    }

    return { messages: [] };
  });

const routerSelector = createSelector(
  state => state.router.currentParams.threadId,
  threadId => ({ threadId })
);

class ThreadController {
  constructor($scope, $state, $ngRedux, DiscussionsActions) {
    'ngInject';
    $scope.$on('$destroy', $ngRedux.connect(threadSelector)(this));
    $scope.$on('$destroy', $ngRedux.connect(routerSelector)((payload) => {
      $ngRedux.dispatch(DiscussionsActions.fetchMessages(payload.threadId));
    }));
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
