export class DiscussionsContactsIconController {
  /*@ngInject*/
  constructor(ContactHelper) {
    if (this.thread.contacts.length > 4) {
      let letters = this.thread.contacts.slice(0, 3).map(contact => ContactHelper.getContactStylesheetClass(contact));
      letters.push(ContactHelper.getStylesheetClass('plus'));

      this.lettersStylesheetClass = letters;
    } else {
      this.lettersStylesheetClass = this.thread.contacts
        .slice(0, 4)
        .map(contact => ContactHelper.getContactStylesheetClass(contact));
    }

    this.iconClass = `contact-icon__letter--${this.lettersStylesheetClass.length}`;
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
      <div class="contact-icon">
        <div class="circle"></div>
        <div class="circle-inner">
          <i ng-repeat="letterClass in ctrl.lettersStylesheetClass" class="contact-icon__letter" ng-class="[letterClass, ctrl.iconClass]"></i>
        </div>
      </div>`
  };
}
