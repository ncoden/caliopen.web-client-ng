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
      contact: '=',
    },
    controller: WidgetContactAvatarLetterController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <div class="m-avatar m-avatar--small">
        <div class="m-avatar__letter" ng-class="ctrl.contactLetterStylesheetClass"></div>
      </div>`,
  };
}
