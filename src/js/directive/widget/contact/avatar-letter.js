export class WidgetContactAvatarLetterController {
  constructor(ContactHelper) {
    'ngInject';
    this.contactLetterStylesheetClass = ContactHelper.getContactStylesheetClass(this.contact);
  }
}

export const WidgetContactAvatarLetterComponent = {
  bindings: {
    contact: '<',
  },
  controller: WidgetContactAvatarLetterController,
  template: `
    <div class="m-avatar m-avatar--small">
      <div
        class="m-avatar__letter m-avatar--small__letter"
        ng-class="$ctrl.contactLetterStylesheetClass"
      ></div>
    </div>`,
};
