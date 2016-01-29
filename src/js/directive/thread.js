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

class ThreadController {
  constructor($scope, $state, $ngRedux, DiscussionsActions) {
    'ngInject';
    this.threadId = $state.params.threadId;
    $scope.$on('$destroy', $ngRedux.connect(threadSelector)(this));
    $ngRedux.dispatch(DiscussionsActions.fetchMessages(this.threadId));
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
