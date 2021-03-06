import { createSelector } from 'reselect';

const threadSelector = createSelector(
  state => state.threadReducer,
  state => state.router.currentParams.thread_id,
  (threadState, threadId) => {
    if (!!threadState.messagesByThreadsId[threadId]) {
      return {
        thread: threadState.threadsById[threadId],
        messages: threadState.messagesByThreadsId[threadId],
        isFetching: threadState.isFetching,
      };
    }

    return { messages: [], isFetching: true };
  }
);

const threadIdSelector = createSelector(
  state => state.router.currentParams.thread_id,
  threadId => ({ threadId })
);

class ThreadController {
  constructor($scope, $state, $ngRedux, DiscussionsActions) {
    'ngInject';
    $scope.$on('$destroy', $ngRedux.connect(threadSelector)(this));
    $scope.$on('$destroy', $ngRedux.connect(threadIdSelector)((payload) => {
      if (!!payload.threadId) {
        $ngRedux.dispatch(DiscussionsActions.fetchThread(payload.threadId));
        $ngRedux.dispatch(DiscussionsActions.fetchMessages(payload.threadId));
      }
    }));
  }
}

const ThreadComponent = {
  controller: ThreadController,
  /* eslint-disable max-len */
  template: `
    <spinner loading="$ctrl.isFetching"></spinner>
    <not-found ng-if="!$ctrl.isFetching && !$ctrl.thread">
      <message>
        <p>{{ 'thread.feedback.thread-not-found'|translate }}</p>
      </message>
    </not-found>
    <ul class="m-block-list" ng-if="!!$ctrl.thread">
      <li ng-repeat="message in $ctrl.messages" class="m-block-list__item">
        <thread-message message="message"></thread-message>
      </li>
    </ul>`,
  /* eslint-enable max-len */
};

export default ThreadComponent;
