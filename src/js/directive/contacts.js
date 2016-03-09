import {createSelector} from 'reselect';

const contactsSelector = createSelector(
  state => state.contactReducer,
  payload => {
    return { contacts: payload.contacts };
  });

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
    template: `
      <div class="container-fluid co-list">
        <co-contacts-contact ng-repeat="contact in ctrl.contacts" contact="contact"></co-contacts-contact>
      </div>`
  };
}
