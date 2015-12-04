class ContactController {
  /* @ngInject */
  constructor($state) {
    const contactId = $state.params.contactId;
  }
}

export function ContactDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller: ContactController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <h2>{{ctrl.contact.fullname}}</h2>`
  };
}
