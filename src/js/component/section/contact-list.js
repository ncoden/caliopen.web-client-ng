import { createSelector } from 'reselect';

const contactsSelector = createSelector(
  state => state.contactReducer,
  payload => ({ contacts: payload.contacts.map(contactId => payload.contactsById[contactId]) })
);

export class ContactListController {
  constructor($scope, $ngRedux, ContactsActions) {
    'ngInject';
    this.$scope = $scope;
    this.$ngRedux = $ngRedux;
    this.ContactsActions = ContactsActions;
  }

  $onInit() {
    this.$scope.$on('$destroy', this.$ngRedux.connect(contactsSelector)(this));
    this.$ngRedux.dispatch(this.ContactsActions.fetchContacts());
  }

  loadMore() {
    this.$ngRedux.dispatch(this.ContactsActions.loadMoreContacts());
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
      <li class="s-contact-list__load-more m-block-list__item" ng-if="$ctrl.hasMore">
        <a ng-click="$ctrl.loadMore()" class="button hollow">
          {{ 'general.action.load_more'|translate }}
        </a>
      </li>
    </ul>`,
  /* eslint-enable max-len */
};
