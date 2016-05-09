import { createSelector } from 'reselect';

const contactsSelector = createSelector(
  state => state.contactReducer,
  payload => ({ contacts: payload.contacts.map(contactId => payload.contactsById[contactId]) })
);

export class ContactListController {
  constructor($scope, $ngRedux, ContactsActions) {
    'ngInject';
    $scope.$on('$destroy', $ngRedux.connect(contactsSelector)(this));
    $ngRedux.dispatch(ContactsActions.fetchContacts());
  }
}

export const ContactListComponent = {
  controller: ContactListController,
  /* eslint-disable max-len */
  template: `
    <ul class="s-contact-list m-block-list">
      <li ng-repeat="contact in $ctrl.contacts" class="m-block-list__item">
        <co-contact-list-contact contact="contact"></co-contact-list-contact>
      </li>
    </ul>`,
  /* eslint-enable max-len */
};