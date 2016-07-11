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

function protocolsReducer(state = [], action) {
  switch (action.type) {
    case actions.RECEIVER_CONTACT_PROTOCOLS:
      return action.protocols;
    default:
      return state;
  }
}

function protocolsByIdReducer(state = {}, action) {
  switch (action.type) {
    case actions.RECEIVER_CONTACT_PROTOCOLS:
    case actions.REQUEST_CONTACT_PROTOCOLS:
      return Object.assign({}, state, {
        [action.contactId]: protocolsReducer(state[action.contactId], action),
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

function contactIdsReducer(state = [], action = {}) {
  if (action.type === actions.RECEIVER_CONTACTS) {
    const ids = state.slice();

    return ids
      .concat(action.contacts.map(contact => contact.contact_id))
      .reduce((prev, curr) => {
        if (prev.indexOf(curr) === -1) {
          prev.push(curr);
        }

        return prev;
      }, []);
  }

  return state;
}

export function hasMore(state) {
  return state.totalContacts > state.contacts.length;
}

export function getNextOffset(state) {
  return state.contacts.length;
}

export function getAvailableContactDetails(contact) {
  const availableContactDetails = [];

  if (!!contact.emails) {
    contact.emails.forEach((email) => {
      const { type, address } = email;
      availableContactDetails.push({ protocol: 'email', type, address });
    });
  }

  if (!!contact.phones) {
    contact.phones.forEach((phone) => {
      const { type, number: address } = phone;
      availableContactDetails.push({ protocol: 'sms', type, address });
    });
  }
}

export default function contactReducer(state = {
  isFetching: false,
  didInvalidate: false,
  contacts: [],
  contactsById: {},
  contactDetailFormsById: {},
  protocolsById: {},
  totalContacts: 0,
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
        contacts: contactIdsReducer(state.contacts, action),
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
    case actions.REQUEST_CONTACT_PROTOCOLS:
      return Object.assign({}, state, {
        isFetching: true,
        protocolsById: protocolsByIdReducer(state.protocolsById, action),
      });
    case actions.RECEIVER_CONTACT_PROTOCOLS:
      return Object.assign({}, state, {
        isFetching: false,
        protocolsById: protocolsByIdReducer(state.protocolsById, action),
      });
    default:
      return state;
  }
}
