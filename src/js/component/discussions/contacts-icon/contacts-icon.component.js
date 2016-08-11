export class ContactsIconController {
  constructor(StylesheetHelper) {
    'ngInject';
    if (this.thread.contacts.length > 4) {
      const letters = this.thread.contacts.slice(0, 3)
        .map(contact => StylesheetHelper.getContactStylesheetClass(contact));
      letters.push(StylesheetHelper.getStylesheetClass('plus'));

      this.lettersStylesheetClass = letters;
    } else {
      this.lettersStylesheetClass = this.thread.contacts
        .slice(0, 4)
        .map(contact => StylesheetHelper.getContactStylesheetClass(contact));
    }

    this.iconClass = `m-avatars__letter--${this.lettersStylesheetClass.length}`;
  }
}

const ContactsIconComponent = {
  bindings: {
    thread: '<',
  },
  controller: ContactsIconController,
  /* eslint-disable max-len */
  template: `
    <div class="m-avatars">
      <div ng-repeat="letterClass in $ctrl.lettersStylesheetClass track by $index" class="m-avatars__letter" ng-class="[letterClass, $ctrl.iconClass]"></div>
    </div>`,
    /* eslint-enable max-len */
};

export default ContactsIconComponent;
