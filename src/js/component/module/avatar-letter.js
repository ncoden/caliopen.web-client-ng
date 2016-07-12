export class AvatarLetterController {
  constructor(ContactHelper) {
    'ngInject';
    this.contactLetterStylesheetClass = ContactHelper.getContactStylesheetClass(this.contact);
  }
}

export const AvatarLetterComponent = {
  bindings: {
    contact: '<',
  },
  controller: AvatarLetterController,
  template: `
    <div class="m-avatar m-avatar--small">
      <div
        class="m-avatar__letter m-avatar--small__letter"
        ng-class="$ctrl.contactLetterStylesheetClass"
      ></div>
    </div>`,
};
