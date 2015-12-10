export class DiscussionsThreadController {
  /*@ngInject*/
  constructor($state) {
    this.$state = $state;
    this.hasUnread = !!this.thread.unread_count && this.thread.unread_count > 0;
    this.fakeDate = new Date();
  }

  showThread() {
    this.$state.go('front.discussions.thread', { threadId: this.thread.thread_id });
  }
}

export function DiscussionsThreadDirective() {
  return {
    restrict: 'E',
    scope: {
      thread: '='
    },
    controller: DiscussionsThreadController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <div ng-click="ctrl.showThread()" class="row caliopen-threads__thread" ng-class="{ 'caliopen-threads__thread--unread': ctrl.hasUnread }">
        <div class="col-md-1 col-sm-1 col-xs-2">
          <co-discussions-contacts-icon thread="ctrl.thread"></co-discussions-contacts-icon>
        </div>
        <div class="col-md-6 col-sm-8 col-xs-9">
          <span class="caliopen-threads__thread__message-summary">
            {{ctrl.thread.text}}
          </span>
        </div>
        <div class="col-md-1 col-sm-1 col-xs-1">
          <i ng-if="ctrl.thread.file_attached" class="fa fa-paperclip" />
        </div>
        <div class="col-md-1 hidden-sm hidden-xs">
          <i class="fa fa-exclamation-triangle" /> {{ctrl.thread.importance_level}}
          <i class="fa fa-eye" /> {{ctrl.thread.privacy_index}}
        </div>
        <div class="col-md-2 col-sm-2 hidden-xs">
          {{ ctrl.fakeDate | amDateFormat:'lll'}}
        </div>
        <div class="col-md-1 hidden-sm hidden-xs">
          <span class="caliopen-threads__thread__nb-messages badge">
            <span ng-if="ctrl.thread.unread_count">{{ctrl.thread.unread_count}}/</span>
            <span>{{ctrl.thread.total_count}}</span>
          </span>
        </div>
      </div>`
  };
}
