import { createSelector } from 'reselect';

const threadsSelector = createSelector(
  state => state.threadReducer,
  payload => ({ threads: payload.threads.map(threadId => payload.threadsById[threadId]) })
);

export class DiscussionsController {
  constructor($scope, $ngRedux, DiscussionsActions) {
    'ngInject';
    $scope.$on('$destroy', $ngRedux.connect(threadsSelector)(this));
    $ngRedux.dispatch(DiscussionsActions.fetchThreads());
  }
}

export const DiscussionsComponent = {
  controller: DiscussionsController,
  /* eslint-disable max-len */
  template: `
    <ul class="s-thread-list m-block-list">
      <li ng-repeat="thread in $ctrl.threads" class="m-block-list__item">
        <co-discussions-thread thread="thread"></co-discussions-thread>
      </li>
    </ul>`,
  /* eslint-enable max-len */
};
