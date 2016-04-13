import { createSelector } from 'reselect';

const threadSelector = createSelector(
  state => state.threadReducer,
  state => state.threadReducer.selectedThread,
  (threadState, threadId) => {
    if (!!threadState.messagesByThreadsId[threadId]) {
      return { messages: threadState.messagesByThreadsId[threadId] };
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
      if (!!payload.threadId) {
        $ngRedux.dispatch(DiscussionsActions.fetchThread(payload.threadId));
        $ngRedux.dispatch(DiscussionsActions.fetchMessages(payload.threadId));
      }
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
    /* eslint-disable max-len */
    template: `
      <ul class="m-block-list">
        <li ng-repeat="message in ctrl.messages" class="m-block-list__item">
          <co-thread-message message="message"></co-thread-message>
        </li>
      </ul>`,
    /* eslint-enable max-len */
  };
}
