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
        route: 'front.discussions.thread',
        routeOpts: { threadId: this.thread.thread_id },
        label: this.threadContactsFilter(this.thread, this.user),
      };
      dispatch(this.TabsActions.selectOrAdd(tab));
      dispatch(stateGo(tab.route, tab.routeOpts));
    });
  }
}

export function DiscussionsThreadDirective() {
  return {
    restrict: 'E',
    scope: {
      thread: '=',
    },
    controller: DiscussionsThreadController,
    controllerAs: 'ctrl',
    bindToController: true,
    /* eslint-disable max-len */
    template: `
      <div ng-click="ctrl.showThread()" class="row co-list__item co-list__item--link co-threads__thread" ng-class="{ 'co-threads__thread--unread': ctrl.hasUnread }">
        <div class="col-md-1 col-sm-1 col-xs-2">
          <co-discussions-contacts-icon thread="ctrl.thread"></co-discussions-contacts-icon>
        </div>
        <div class="col-md-6 col-sm-8 col-xs-9">
          <div class="co-text--ellipsis">
            {{ctrl.thread|threadContacts:ctrl.user}}
          </div>
          <div class="co-text--ellipsis">
            {{ctrl.thread.text}}
          </div>
        </div>
        <div class="col-md-1 col-sm-1 col-xs-1">
          <i ng-if="ctrl.thread.file_attached" class="fa fa-paperclip"></i>
        </div>
        <div class="col-md-1 hidden-sm hidden-xs">
          <i class="fa fa-exclamation-triangle"></i> {{ctrl.thread.importance_level}}
          <i class="fa fa-eye"></i> {{ctrl.thread.privacy_index}}
        </div>
        <div class="col-md-2 col-sm-2 hidden-xs">
          <time title="{{ ctrl.fakeDate | amDateFormat: 'LLL' }}">
            <span class="co-text--ellipsis">{{ ctrl.fakeDate | amDateFormat: 'll' }}</span>
            <span class="co-text--ellipsis">{{ ctrl.fakeDate | amDateFormat: 'LT' }}</span>
          </time>
        </div>
        <div class="col-md-1 hidden-sm hidden-xs">
          <span class="co-threads__thread__nb-messages badge">
            <span ng-if="ctrl.thread.unread_count">{{ctrl.thread.unread_count}}/</span>
            <span>{{ctrl.thread.total_count}}</span>
          </span>
        </div>
      </div>`,
    /* eslint-enable max-len */
  };
}
