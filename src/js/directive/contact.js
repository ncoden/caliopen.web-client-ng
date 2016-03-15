import { createSelector } from 'reselect';

const contactSelector = createSelector(
  state => state.contactReducer,
  state => state.router.currentParams.contactId,
  (contactsState, contactId) => {
    if (!!contactsState[contactId]) {
      return { contact: contactsState[contactId] };
    }

    return { contact: {} };
  });

const routerSelector = createSelector(
  state => state.router.currentParams.contactId,
  contactId => ({ contactId })
);

class ContactController {
  constructor($scope, $ngRedux, ContactsActions) {
    'ngInject';
    $scope.$on('$destroy', $ngRedux.connect(contactSelector)(this));
    $scope.$on('$destroy', $ngRedux.connect(routerSelector)((payload) => {
      if (!!payload.contactId) {
        $ngRedux.dispatch(ContactsActions.fetchContact(payload.contactId));
      }
    }));
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
      <h2>{{ctrl.contact.title}}</h2>`,
  };
}
