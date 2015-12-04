class ThreadMessageController {

}

export function ThreadMessageDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller: ThreadMessageController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <div class="row caliopen-messages__message">
        <div class="col-xs-2 col-sm-1">
          <co-thread-message-contact-icon contact=ctrl.message.contact></co-thread-message-contact-icon>
        </div>
        <div ng-click="isBodyExpanded = !isBodyExpanded" class="caliopen-messages__message--summary">
          <div class="col-xs-8 col-sm-4 col-md-6 caliopen-messages__message__subject">
            <span>{{ ctrl.message.contact.title }},</span>
            <span class="hidden-xs">{{ ctrl.message.subject }}</span>
          </div>
          <div class="col-xs-1 hidden-sm hidden-md hidden-lg caliopen-messages__message--summary">
            <span class="pull-right">
              <i class="fa" ng-class="isBodyExpanded ? 'fa-minus-square-o' : 'fa-plus-square-o'"></i>
            </span>
          </div>
          <div class="col-xs-9 col-sm-3 col-md-2 caliopen-messages__message--summary">
            <co-widget-date date="ctrl.message.date" format="lll"></co-widget-date>
          </div>
          <div class="col-xs-1 caliopen-messages__message--summary">
            <i ng-class="ctrl.message.attachment" class="fa fa-paperclip"></i>
          </div>
          <div class="col-xs-4 col-sm-2 col-md-1 caliopen-messages__message--summary">
            <i class="fa fa-exclamation-triangle" /> {{ctrl.message.importance_level}}
            <i class="fa fa-eye" /> {{ctrl.message.privacy_index}}
          </div>
          <div class="col-sm-1 hidden-xs caliopen-messages__message--summary">
            <span class="pull-right">
              <i class="fa" ng-class="isBodyExpanded ? 'fa-minus-square-o' 'fa-plus-square-o'"></i>
            </span>
          </div>
          <span class="col-xs-12 hidden-sm hidden-md hidden-lg caliopen-messages__message__subject caliopen-messages__message--summary">
            {{ctrl.message.subject}}
          </span>
        </div>
        <div class="col-xs-12 col-sm-11 caliopen-messages__message__message-body" ng-class="{'caliopen-messages__message__message-body--expanded': isBodyExpanded }">
          {{body}}
        </div>
        <div class="col-xs-12 caliopen-messages__message__spacer-toggle" ng-click="isBodyExpanded = !isBodyExpanded">
          <i class="fa" ng-class="isBodyExpanded ? 'fa-caret-square-o-up' : 'fa-caret-square-o-down'"></i>
        </div>
      </div>`
  };
}
