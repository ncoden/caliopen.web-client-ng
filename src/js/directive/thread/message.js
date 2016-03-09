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
      <div class="co-list__item co-messages__message__header clearfix">
        <div class="co-messages__message__contact-icon pull-left">
          <widget-contact-avatar-letter contact="{ address: ctrl.message.from_ }"></widget-contact-avatar-letter>
        </div>
        <span class="pull-left">
          <div class="co-text--ellipsis">
            {{ ctrl.message.from_ }}
          </div>
          <div class="co-messages__message__summary">
            {{ ctrl.message.date | amDateFormat:'lll'}} 
          </div>
        </span>
        <span class="co-messages__message--summary pull-right">
          <i ng-if="ctrl.thread.file_attached" class="fa fa-paperclip"></i>
          <span class="hidden-xs">
            <i class="fa fa-exclamation-triangle"></i> {{ctrl.message.importance_level}}
            <i class="fa fa-eye"></i> {{ctrl.message.privacy_index}}
          </span>
        </span>
      </div>
      <div class="co-list__item co-messages__message__body">
        <div ng-bind-html="ctrl.message.text"></div>
      </div>`
  };
}
