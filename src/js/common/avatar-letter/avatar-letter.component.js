export class AvatarLetterController {
  constructor(StylesheetHelper) {
    'ngInject';
    this.contactLetterStylesheetClass = StylesheetHelper.getContactStylesheetClass(this.contact);
  }
}

const AvatarLetterComponent = {
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

export default AvatarLetterComponent;
