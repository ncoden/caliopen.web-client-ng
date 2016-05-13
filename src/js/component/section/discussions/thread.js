import { stateGo } from 'redux-ui-router';
import { createSelector } from 'reselect';

const userSelector = createSelector(
  state => state.userReducer.user,
  user => ({ user })
);

export class DiscussionsThreadController {
  constructor($scope, $state, $ngRedux, TabsActions, threadContactsFilter) {
    'ngInject';
    this.$state = $state;
    this.$ngRedux = $ngRedux;
    this.TabsActions = TabsActions;
    this.threadContactsFilter = threadContactsFilter;
    this.hasUnread = !!this.thread.unread_count && this.thread.unread_count > 0;
    this.fakeDate = new Date();

    $scope.$on('$destroy', $ngRedux.connect(userSelector)(this));
  }

  showThread() {
    this.$ngRedux.dispatch(dispatch => {
      const tab = {
        type: 'thread',
        item: {
          thread_id: this.thread.thread_id,
        },
      };
      dispatch(this.TabsActions.selectOrAdd(tab));
      dispatch(stateGo('front.discussions.thread', { threadId: this.thread.thread_id }));
    });
  }
}

export const DiscussionsThreadComponent = {
  bindings: {
    thread: '<',
  },
  controller: DiscussionsThreadController,
  template: `
    <div ng-click="$ctrl.showThread()"
      class="s-thread-list__thread m-block-list__item-content m-block-list__item-content--link"
      ng-class="{ 's-thread-list__thread--unread': $ctrl.hasUnread }"
    >
      <div class="s-thread-list__col-avatars">
        <co-discussions-contacts-icon thread="$ctrl.thread"></co-discussions-contacts-icon>
      </div>
      <div class="s-thread-list__col-title">
        <div class="m-text-line">
          {{ $ctrl.thread|threadContacts:$ctrl.user }}
        </div>
        <div class="m-text-line">
          {{ $ctrl.thread.text }}
        </div>
      </div>
      <div class="s-thread-list__col-file">
        <i ng-if="$ctrl.thread.file_attached" class="fa fa-paperclip"></i>
      </div>
      <div class="s-thread-list__col-indexes">
        <span class="m-text-word">
          <i class="fa fa-exclamation-triangle"></i>
          {{ $ctrl.thread.importance_level }}
        </span>
        <span class="m-text-word">
          <i class="fa fa-eye"></i>
          {{ $ctrl.thread.privacy_index }}
        </span>
      </div>
      <div class="s-thread-list__col-dates">
        <time title="{{ $ctrl.fakeDate | amDateFormat: 'LLL' }}">
          <span class="m-text-word">{{ $ctrl.fakeDate | amDateFormat: 'll' }}</span>
          <span class="m-text-word">{{ $ctrl.fakeDate | amDateFormat: 'LT' }}</span>
        </time>
      </div>
      <div class="s-thread-list__col-count">
        <span ng-if="$ctrl.thread.unread_count"
          class="m-badge m-badge--low"
        >{{ $ctrl.thread.unread_count }}</span>
      </div>
    </div>`,
};
