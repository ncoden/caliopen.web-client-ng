class MessageController {

}

const MessageComponent = {
  bindings: {
    message: '<',
  },
  controller: MessageController,
  /* eslint-disable max-len */
  template: `
    <div class="s-message">
      <div class="m-block-list__item-content s-message__header">
        <div class="s-message__col-avatar">
          <avatar-letter contact="{ address: $ctrl.message.from_ }"></avatar-letter>
        </div>

        <div class="s-message__col-summary">
          <div class="m-text-line">
            {{ $ctrl.message.from_ }}
          </div>
          <div class="s-message__date">
            {{ $ctrl.message.date | amDateFormat:'lll' }}
          </div>
        </div>

        <div class="s-message__col-about">
          <i ng-if="$ctrl.thread.file_attached" class="fa fa-paperclip"></i>
        </div>
      </div>

      <div class="m-block-list__item-content s-message__body">
        <div ng-bind-html="$ctrl.message.text"></div>
      </div>

    </div>`,
  /* eslint-enable max-len */
};

export default MessageComponent;
