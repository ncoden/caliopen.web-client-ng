export const LayoutFlashMessageListComponent = {
  /* eslint-disable max-len */
  template: `
    <div class="l-flash-message-list">
      <flash-message>
        <div class="m-flash-message" ng-class="flash.type ? ('m-flash-message--' + flash.type) : ''">
          <button
            class="m-flash-message__button"
            ng-show="flash.showClose"
            close-flash="{{ flash.id }}"
            aria-label="{{ 'general.action.close'|translate }}"
          >
            <i class="fa fa-close"></i>
          </button>
          {{ flash.text }}
        </div>
      </flash-message>
    </div>
  `,
  /* eslint-enable max-len */
};
