import * as action from './action-types.js';

export class ContactsActions {
  constructor(ContactRepository) {
    'ngInject';
    this.ContactRepository = ContactRepository;
  }

  requestContact(contactId) {
    return {
      type: action.REQUEST_CONTACT,
      contactId,
    };
  }

  receiveContact(contactId, json) {
    return {
      type: action.RECEIVER_CONTACT,
      contactId,
      contact: json.contacts,
      receiveAt: Date.now(),
    };
  }

  requestContacts() {
    return {
      type: action.REQUEST_CONTACTS,
    };
  }

  receiveContacts(json) {
    return {
      type: action.RECEIVER_CONTACTS,
      contacts: json.contacts,
      total: json.total,
      receiveAt: Date.now(),
    };
  }

  fetchContact(contactId) {
    return dispatch => {
      dispatch(this.requestContact(contactId));

      return this.ContactRepository.findByContactId(contactId)
        .then(json => dispatch(this.receiveContact(contactId, json)));
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
