import * as actions from './action-types.js';

export default class ContactsActions {
  constructor(ContactRepository) {
    'ngInject';
    this.ContactRepository = ContactRepository;
  }

  requestContact(contactId) {
    return {
      type: actions.REQUEST_CONTACT,
      payload: { contactId },
    };
  }

  receiveContact(contactId, json) {
    return {
      type: actions.RECEIVE_CONTACT,
      payload: {
        contactId,
        contact: json.contacts,
        receiveAt: Date.now(),
      },
    };
  }

  requestContacts() {
    return {
      type: actions.REQUEST_CONTACTS,
      payload: {},
    };
  }

  receiveContacts(json) {
    return {
      type: actions.RECEIVE_CONTACTS,
      payload: {
        contacts: json.contacts,
        total: json.total,
        receiveAt: Date.now(),
      },
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
      payload: {},
    };
  }

  addContactDetail(contactId, contactDetailType, contactDetail) {
    return dispatch => {
      dispatch({
        type: actions.ADD_CONTACT_DETAIL,
        payload: {
          contactId,
          contactDetailType,
          contactDetail,
        },
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
      payload: {
        contactId,
        contactDetailType,
        contactDetail,
      },
    };
  }

  addContactDetailFailed(contactId, contactDetailType, errors) {
    return {
      type: actions.ADD_CONTACT_DETAIL_FAILED,
      payload: {
        contactId,
        contactDetailType,
        errors,
      },
    };
  }

  deleteContactDetail(contactDetailType, contactId, contactDetail) {
    return dispatch => {
      dispatch({
        type: actions.DELETE_CONTACT_DETAIL,
        payload: {
          contactDetailType,
          contactDetail,
        },
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
      payload: {
        contactId,
        contactDetailType,
        contactDetail,
      },
    };
  }

  deleteContactDetailFailed(contactId, contactDetailType, errors) {
    return {
      type: actions.DELETE_CONTACT_DETAIL_FAILED,
      payload: {
        contactId,
        contactDetailType,
        errors,
      },
    };
  }

  fetchProtocols(contactId, source) {
    return dispatch => {
      dispatch({
        type: actions.REQUEST_CONTACT_PROTOCOLS,
        payload: {
          contactId,
        },
      });

      return this.ContactRepository
        .findProtocolsByContactId(contactId, source)
        .then(({ protocols }) => dispatch({
          type: actions.RECEIVE_CONTACT_PROTOCOLS,
          payload: {
            contactId,
            protocols,
          },
        }));
    };
  }
}
