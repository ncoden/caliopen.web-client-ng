import { v1 as uuidV1 } from 'uuid';

export class DiscussionsThreadController {
  constructor($state, $ngRedux, TabsActions) {
    'ngInject';
    this.$state = $state;
    this.$ngRedux = $ngRedux;
    this.TabsActions = TabsActions;
    this.hasUnread = !!this.thread.unread_count && this.thread.unread_count > 0;
    this.fakeDate = new Date();
  }

  showThread() {
    this.$ngRedux.dispatch(dispatch => {
      dispatch(this.TabsActions.addTab({
        id: uuidV1(),
        route: 'front.discussions.thread',
        routeOpts: { threadId: this.thread.thread_id },
        label: this.thread.text,
      }));
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
          {{ ctrl.fakeDate | amDateFormat:'lll'}}
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
