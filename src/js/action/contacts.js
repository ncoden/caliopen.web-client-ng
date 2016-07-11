import * as actions from './action-types.js';

export default class ContactsActions {
  constructor(ContactRepository) {
    'ngInject';
    this.ContactRepository = ContactRepository;
  }

  requestContact(contactId) {
    return {
      type: actions.REQUEST_CONTACT,
      contactId,
    };
  }

  receiveContact(contactId, json) {
    return {
      type: actions.RECEIVER_CONTACT,
      contactId,
      contact: json.contacts,
      receiveAt: Date.now(),
    };
  }

  requestContacts() {
    return {
      type: actions.REQUEST_CONTACTS,
    };
  }

  receiveContacts(json) {
    return {
      type: actions.RECEIVER_CONTACTS,
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

  fetchContacts(offset = 0, limit = 1000, source) {
    return dispatch => {
      dispatch(this.requestContacts());

      return this.ContactRepository.findAll(offset, limit, source)
        .then(json => dispatch(this.receiveContacts(json)));
    };
  }

  loadMoreContacts() {
    return {
      type: actions.LOAD_MORE_CONTACTS,
    };
  }

  addContactDetail(contactId, contactDetailType, contactDetail) {
    return dispatch => {
      dispatch({
        type: actions.ADD_CONTACT_DETAIL,
        contactId,
        contactDetailType,
        contactDetail,
      });

      return this.ContactRepository.addContactDetail(contactId, contactDetailType, contactDetail)
        .then(json => dispatch(this.addContactDetailSucceeded(contactId, contactDetailType, json)))
        .catch(json =>
          dispatch(this.addContactDetailFailed(contactId, contactDetailType, json.errors)));
    };
  }

  addContactDetailSucceeded(contactId, contactDetailType, contactDetail) {
    return {
      type: actions.ADD_CONTACT_DETAIL_SUCCEEDED,
      contactId,
      contactDetailType,
      contactDetail,
    };
  }

  addContactDetailFailed(contactId, contactDetailType, errors) {
    return {
      type: actions.ADD_CONTACT_DETAIL_FAILED,
      contactId,
      contactDetailType,
      errors,
    };
  }

  deleteContactDetail(contactDetailType, contactId, contactDetail) {
    return dispatch => {
      dispatch({
        type: actions.DELETE_CONTACT_DETAIL,
        contactDetailType,
        contactDetail,
      });

      return this.ContactRepository.deleteContactDetail(contactDetailType, contactId, contactDetail)
        .then(() =>
          dispatch(this.deleteContactDetailSucceeded(contactId, contactDetailType, contactDetail)))
        .catch(json =>
          dispatch(this.deleteContactDetailFailed(contactId, contactDetailType, json)));
    };
  }

  deleteContactDetailSucceeded(contactId, contactDetailType, contactDetail) {
    return {
      type: actions.DELETE_CONTACT_DETAIL_SUCCEEDED,
      contactId,
      contactDetailType,
      contactDetail,
    };
  }

  deleteContactDetailFailed(contactId, contactDetailType, errors) {
    return {
      type: actions.DELETE_CONTACT_DETAIL_FAILED,
      contactId,
      contactDetailType,
      errors,
    };
  }

  fetchProtocols(contactId, source) {
    return dispatch => {
      dispatch({
        type: actions.REQUEST_CONTACT_PROTOCOLS,
        contactId,
      });

      return this.ContactRepository
        .findProtocolsByContactId(contactId, source)
        .then(({ protocols }) => dispatch({
          type: actions.RECEIVER_CONTACT_PROTOCOLS,
          contactId,
          protocols,
        }));
    };
  }
}
