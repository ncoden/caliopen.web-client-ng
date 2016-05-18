import { createSelector } from 'reselect';
import { hasMore } from '../../reducer/thread-reducer.js';

const threadsSelector = createSelector(
  state => state.threadReducer,
  payload => ({
    hasMore: hasMore(payload),
    threads: payload.threads.map(threadId => payload.threadsById[threadId]),
  })
);

export class DiscussionsController {
  constructor($scope, $ngRedux, DiscussionsActions) {
    'ngInject';
    this.$scope = $scope;
    this.$ngRedux = $ngRedux;
    this.DiscussionsActions = DiscussionsActions;
  }

  $onInit() {
    this.$scope.$on('$destroy', this.$ngRedux.connect(threadsSelector)(this));
    this.$ngRedux.dispatch(this.DiscussionsActions.fetchThreads());
  }

  loadMore() {
    this.$ngRedux.dispatch(this.DiscussionsActions.loadMoreThreads());
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
      <li class="s-thread-list__load-more m-block-list__item" ng-if="$ctrl.hasMore">
        <a ng-click="$ctrl.loadMore()" class="button hollow">
          {{ 'general.action.load_more'|translate }}
        </a>
      </li>
    </ul>`,
  /* eslint-enable max-len */
};
