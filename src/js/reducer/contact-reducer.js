import * as actions from '../action/action-types.js';

function contactByIdReducer(state = {}, action = {}) {
  return action.contacts.reduce(
    (previousState, contact) => Object.assign({}, previousState, { [contact.contact_id]: contact })
    , state
  );
}

export function contactReducer(state = {
  isFetching: false,
  didInvalidate: false,
  contacts: [],
  contactsById: {},
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
    default:
      return state;
  }
}
