import { createSelector } from 'reselect';

const contactsSelector = createSelector(
  state => state.contactReducer,
  payload => ({ contacts: payload.contacts.map(contactId => payload.contactsById[contactId]) })
);

export class ContactsController {
  constructor($scope, $ngRedux, ContactsActions) {
    'ngInject';
    $scope.$on('$destroy', $ngRedux.connect(contactsSelector)(this));
    $ngRedux.dispatch(ContactsActions.fetchContacts());
  }
}

export function ContactsDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller: ContactsController,
    controllerAs: 'ctrl',
    bindToController: true,
    /* eslint-disable max-len */
    template: `
      <ul class="s-contact-list m-block-list">
        <li class="m-block-list__item">
          <co-contacts-contact ng-repeat="contact in ctrl.contacts" contact="contact"></co-contacts-contact>
        </li>
      </ul>`,
    /* eslint-enable max-len */
  };
}
