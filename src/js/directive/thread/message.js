class ThreadMessageController {

}

export function ThreadMessageDirective() {
  return {
    restrict: 'E',
    scope: {
      message: '='
    },
    controller: ThreadMessageController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <div class="row caliopen-messages__message">
        <div class="col-xs-2 col-sm-1">
          <widget-contact-avatar-letter contact="{ address: ctrl.message.from_ }"></widget-contact-avatar-letter>
        </div>
        <div class="caliopen-messages__message--summary">
          <div class="col-xs-8 col-sm-4 col-md-6 caliopen-messages__message__subject">
            <span>{{ ctrl.message.from_ }},</span>
            <span class="hidden-xs">{{ ctrl.message.subject }}</span>
          </div>
          <div class="col-xs-9 col-sm-3 col-md-2 caliopen-messages__message--summary">
            {{ ctrl.message.date | amDateFormat:'lll'}}
          </div>
          <div class="col-xs-1 caliopen-messages__message--summary">
            <i ng-if="ctrl.thread.file_attached" class="fa fa-paperclip"></i>
          </div>
          <div class="col-xs-4 col-sm-2 col-md-1 caliopen-messages__message--summary">
            <i class="fa fa-exclamation-triangle"></i> {{ctrl.message.importance_level}}
            <i class="fa fa-eye"></i> {{ctrl.message.privacy_index}}
          </div>
          <span class="col-xs-12 hidden-sm hidden-md hidden-lg caliopen-messages__message__subject caliopen-messages__message--summary">
            {{ctrl.message.subject}}
          </span>
        </div>
        <div class="col-xs-12 col-sm-11 caliopen-messages__message__message-body">
          <div ng-bind-html="ctrl.message.text"></div>
        </div>
      </div>`
  };
}
