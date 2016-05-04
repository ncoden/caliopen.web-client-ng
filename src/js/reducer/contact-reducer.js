import * as actions from '../action/action-types.js';

function contactDetailFormReducer(state = {
  loading: false,
  errors: [],
  contactDetail: {},
}, action) {
  switch (action.type) {
    case actions.ADD_CONTACT_DETAIL:
      return Object.assign({}, state, {
        loading: true,
        errors: [],
        contactDetail: action.contactDetail,
      });
    case actions.ADD_CONTACT_DETAIL_FAILED:
      return Object.assign({}, state, {
        loading: false,
        errors: action.errors,
      });
    case actions.ADD_CONTACT_DETAIL_SUCCEEDED:
      return Object.assign({}, state, {
        loading: false,
        errors: [],
        contactDetail: {},
      });
    default:
      return state;
  }
}

function contactDetailFormsReducer(state = {}, action) {
  return Object.assign({}, state, {
    [`${action.contactDetailType}Form`]: contactDetailFormReducer(
      state[`${action.contactDetailType}Form`],
      action),
  });
}

function contactDetailFormsByIdReducer(state = {}, action) {
  switch (action.type) {
    case actions.ADD_CONTACT_DETAIL:
    case actions.ADD_CONTACT_DETAIL_FAILED:
    case actions.ADD_CONTACT_DETAIL_SUCCEEDED:
      return Object.assign({}, state, {
        [action.contactId]: contactDetailFormsReducer(state[action.contactId], action),
      });
    default:
      return state;
  }
}

function contactByIdReducer(state = {}, action = {}) {
  return action.contacts.reduce((previousState, contact) => Object.assign({}, previousState, {
    [contact.contact_id]: contact,
  }), state);
}

export function contactReducer(state = {
  isFetching: false,
  didInvalidate: false,
  contacts: [],
  contactsById: {},
  contactDetailFormsById: {},
}, action = {}) {
  switch (action.type) {
    case actions.REQUEST_CONTACT:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        selectedContact: action.contactId,
      });
    case actions.RECEIVER_CONTACT:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        contactsById: contactByIdReducer(state.contactsById, { contacts: [action.contact] }),
        lastUpdated: action.receivedAt,
      });
    case actions.REQUEST_CONTACTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        selectedContact: undefined,
      });
    case actions.RECEIVER_CONTACTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        contacts: action.contacts.map(contact => contact.contact_id),
        contactsById: contactByIdReducer(state.contactsById, action),
        totalContacts: action.total,
        lastUpdated: action.receivedAt,
      });
    case actions.ADD_CONTACT_DETAIL:
    case actions.ADD_CONTACT_DETAIL_FAILED:
    case actions.ADD_CONTACT_DETAIL_SUCCEEDED:
      return Object.assign({}, state, {
        contactDetailFormsById: contactDetailFormsByIdReducer(state.contactDetailFormsById, action),
      });
    default:
      return state;
  }
}
