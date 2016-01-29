export class WidgetContactAvatarLetterController {
  constructor(ContactHelper) {
    'ngInject';
    this.contactLetterStylesheetClass = ContactHelper.getContactStylesheetClass(this.contact);
  }
}

export function WidgetContactAvatarLetterDirective() {
  return {
    restrict: 'E',
    scope: {
      contact: '='
    },
    controller: WidgetContactAvatarLetterController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <div class="contact-avatar">
        <i class="contact-icon__letter contact-avatar__letter" ng-class="ctrl.contactLetterStylesheetClass"></i>
      </div>`
  };
}
