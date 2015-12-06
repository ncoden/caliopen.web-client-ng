class DiscussionsController {

}

export function DiscussionsDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller: DiscussionsController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <div class="container-fluid">
        <div ng-repeat="thread in ctrl.discussions" ng-click="ctrl.tabbableLink(thread)">
          <div class="col-md-1 col-sm-1 col-xs-2">
            <co-thread-contacts-icon contacts="thread.contacts"></co-thread-contacts-icon>
          </div>
          <div class="col-md-6 col-sm-8 col-xs-9">
            <span class="caliopen-threads__thread__message-summary">
              {{thread.text}}
            </span>
          </div>
          <div class="col-md-1 col-sm-1 col-xs-1">
            <i ng-if="thread.file_attached" class="fa fa-paperclip" />
          </div>
          <div class="col-md-1 hidden-sm hidden-xs">
            <i class="fa fa-exclamation-triangle" /> {{thread.importance_level}}
            <i class="fa fa-eye" /> {{thread.privacy_index}}
          </div>
          <div class="col-md-2 col-sm-2 hidden-xs">
            <co-thread-date-last-message date="thread.last_message_date"></co-thread-date-last-message>
          </div>
          <div class="col-md-1 hidden-sm hidden-xs">
            <co-thread-count-messages thread="thread"></co-thread-count-messages>
          </div>
        </div>
      </div>`
  };
}
