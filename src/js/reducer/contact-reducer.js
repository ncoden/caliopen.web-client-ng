import * as actions from '../action/action-types.js';

function contactDetailFormReducer(state = {
  loading: false,
  errors: [],
  contactDetail: {},
}, action) {
  switch (action.type) {
    case actions.ADD_CONTACT_DETAIL:
      return {
        ...state,
        loading: true,
        errors: [],
        contactDetail: action.payload.contactDetail,
      };
    case actions.ADD_CONTACT_DETAIL_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
      };
    case actions.ADD_CONTACT_DETAIL_SUCCEEDED:
      return {
        ...state,
        loading: false,
        errors: [],
        contactDetail: {},
      };
    default:
      return state;
  }
}

function contactDetailFormsReducer(state = {}, action) {
  return {
    ...state,
    [`${action.payload.contactDetailType}Form`]: contactDetailFormReducer(
      state[`${action.payload.contactDetailType}Form`],
      action),
  };
}

function contactDetailFormsByIdReducer(state = {}, action) {
  switch (action.type) {
    case actions.ADD_CONTACT_DETAIL:
    case actions.ADD_CONTACT_DETAIL_FAILED:
    case actions.ADD_CONTACT_DETAIL_SUCCEEDED:
      return {
        ...state,
        [action.payload.contactId]: contactDetailFormsReducer(
          state[action.payload.contactId],
          action
        ),
      };
    default:
      return state;
  }
}

function protocolsReducer(state = [], action) {
  switch (action.type) {
    case actions.RECEIVE_CONTACT_PROTOCOLS:
      return action.payload.protocols;
    default:
      return state;
  }
}

function protocolsByIdReducer(state = {}, action) {
  switch (action.type) {
    case actions.RECEIVE_CONTACT_PROTOCOLS:
    case actions.REQUEST_CONTACT_PROTOCOLS:
      return {
        ...state,
        [action.payload.contactId]: protocolsReducer(state[action.payload.contactId], action),
      };
    default:
      return state;
  }
}

function contactByIdReducer(state = {}, action = {}) {
  return action
    .payload
    .contacts
    .reduce((previousState, contact) => Object.assign({}, previousState, {
      [contact.contact_id]: contact,
    }), state);
}

function contactIdsReducer(state = [], action = {}) {
  if (action.type === actions.RECEIVE_CONTACTS) {
    const ids = state.slice();

    return ids
      .concat(action.payload.contacts.map(contact => contact.contact_id))
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
  contacts: [],
  contactsById: {},
  contactDetailFormsById: {},
  protocolsById: {},
  totalContacts: 0,
  didInvalidate: false,
}, action = {}) {
  switch (action.type) {
    case actions.REQUEST_CONTACT:
      return {
        ...state,
        isFetching: true,
        selectedContact: action.payload.contactId,
      };
    case actions.RECEIVE_CONTACT:
      return {
        ...state,
        isFetching: false,
        contactsById: contactByIdReducer(
          state.contactsById,
          { payload: { contacts: [action.payload.contact] } }
        ),
        lastUpdated: action.payload.receivedAt,
      };
    case actions.REQUEST_CONTACTS:
      return {
        ...state,
        isFetching: true,
        selectedContact: undefined,
      };
    case actions.RECEIVE_CONTACTS:
      return {
        ...state,
        isFetching: false,
        contacts: contactIdsReducer(
          state.didInvalidate === true ? [] : state.contacts,
          action
        ),
        contactsById: contactByIdReducer(
          state.didInvalidate === true ? {} : state.contactsById,
          action
        ),
        totalContacts: action.payload.total,
        lastUpdated: action.payload.receivedAt,
        didInvalidate: false,
      };
    case actions.ADD_CONTACT_DETAIL:
    case actions.ADD_CONTACT_DETAIL_FAILED:
    case actions.ADD_CONTACT_DETAIL_SUCCEEDED:
      return {
        ...state,
        contactDetailFormsById: contactDetailFormsByIdReducer(state.contactDetailFormsById, action),
      };
    case actions.REQUEST_CONTACT_PROTOCOLS:
      return {
        ...state,
        isFetching: true,
        protocolsById: protocolsByIdReducer(state.protocolsById, action),
      };
    case actions.RECEIVE_CONTACT_PROTOCOLS:
      return {
        ...state,
        isFetching: false,
        protocolsById: protocolsByIdReducer(state.protocolsById, action),
      };
    case actions.INVALIDATE_CONTACTS:
      return {
        ...state,
        didInvalidate: true,
      };
    case actions.CONTACT_NOT_FOUND:
      return {
        ...state,
        isFetching: false,
        contactsById: Object.keys(state.contactsById)
          .filter(id => id !== action.payload.contactId)
          .reduce((prev, id) => ({ ...prev, [id]: state.contactsById[id] }), {}),
        contacts: state.contacts.filter(id => id !== action.payload.contactId),
      };
    default:
      return state;
  }
}
