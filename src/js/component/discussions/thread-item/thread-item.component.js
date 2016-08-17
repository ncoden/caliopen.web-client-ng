import { createSelector } from 'reselect';

const userSelector = createSelector(
  state => state.userReducer.user,
  user => ({ user })
);

export class ThreadItemController {
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
}

const ThreadItemComponent = {
  bindings: {
    thread: '<',
  },
  controller: ThreadItemController,
  template: `
    <div ui-sref="thread({ thread_id: $ctrl.thread.thread_id })"
      class="s-thread-list__thread m-block-list__item-content m-block-list__item-content--link"
      ng-class="{ 's-thread-list__thread--unread': $ctrl.hasUnread }"
    >
      <div class="s-thread-list__col-avatars">
        <contacts-icon thread="$ctrl.thread"></contacts-icon>
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

export default ThreadItemComponent;
