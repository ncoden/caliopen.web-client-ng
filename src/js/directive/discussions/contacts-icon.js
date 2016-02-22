export class DiscussionsContactsIconController {
  constructor(ContactHelper) {
    'ngInject';
    if (this.thread.contacts.length > 4) {
      let letters = this.thread.contacts.slice(0, 3).map(contact => ContactHelper.getContactStylesheetClass(contact));
      letters.push(ContactHelper.getStylesheetClass('plus'));

      this.lettersStylesheetClass = letters;
    } else {
      this.lettersStylesheetClass = this.thread.contacts
        .slice(0, 4)
        .map(contact => ContactHelper.getContactStylesheetClass(contact));
    }

    this.iconClass = `co-avatars__letter--${this.lettersStylesheetClass.length}`;
  }
}

export function DiscussionsContactsIconDirective () {
  return {
    restrict: 'E',
    scope: {
      thread: '='
    },
    controller: DiscussionsContactsIconController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <div class="co-avatars">
        <div ng-repeat="letterClass in ctrl.lettersStylesheetClass" class="co-avatars__letter" ng-class="[letterClass, ctrl.iconClass]"></div>
      </div>`
  };
}
