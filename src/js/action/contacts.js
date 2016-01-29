import * as action from './action-types.js';

export class ContactsActions {
  constructor(ContactRepository) {
    'ngInject';
    this.ContactRepository = ContactRepository;
  }

  selectContact(contactId) {
    return {
      type: action.SELECT_CONTACT,
      contactId
    };
  }

  requestContacts() {
    return {
      type: action.REQUEST_CONTACTS
    };
  }

  receiveContacts(json) {
    return {
      type: action.RECEIVER_CONTACTS,
      contacts: json.contacts,
      total: json.total,
      receiveAt: Date.now()
    };
  }

  fetchContacts() {
    return dispatch => {
      dispatch(this.requestContacts());
      return this.ContactRepository.findAll()
        .then(json => dispatch(this.receiveContacts(json)));
    };
  }
}
