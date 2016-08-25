import * as actions from '../../../src/js/action/action-types.js';

function applyConnexionActions(state = {}, action) {
  switch (action.type) {
    case actions.CONNECT_REMOTE_IDENTITY:
      return {
        ...state,
        is_fetching: true,
        connection_required: true,
        cancel_fetch_required: false,
      };
    case actions.DISCONNECT_REMOTE_IDENTITY:
      return { ...state, connection_required: false, cancel_fetch_required: true };
    default:
      return state;
  }
}

const initialRemoteIdentity = {
  remote_identity_id: undefined,
  is_fetching: false,
  connected: false,
  connection_required: false,
  cancel_fetch_required: false,
  identity_type: undefined,
  identity_id: undefined,
  params: { },
};

function updateRemoteIdentity(state = initialRemoteIdentity, action) {
  switch (action.type) {
    case actions.RECEIVE_REMOTE_IDENTITY:
    case actions.UPDATE_REMOTE_IDENTITY:
      return { ...state, ...action.payload.remoteIdentity };
    default:
      return applyConnexionActions(state, action);
  }
}

function updateRemoteIdentitiesbyId(state = {}, action = {}) {
  let remoteIdentityId;
  switch (action.type) {
    case actions.RECEIVE_REMOTE_IDENTITY:
    case actions.UPDATE_REMOTE_IDENTITY:
    case actions.CONNECT_REMOTE_IDENTITY:
    case actions.DISCONNECT_REMOTE_IDENTITY:
      remoteIdentityId = action.payload.remoteIdentity.remote_identity_id;

      return {
        ...state,
        [remoteIdentityId]: updateRemoteIdentity(state[remoteIdentityId], action),
      };
    default:
      return state;
  }
}

function updateRemoteIdentities(state = [], action = {}) {
  let remoteIdentityId;
  switch (action.type) {
    case actions.RECEIVE_REMOTE_IDENTITY:
      remoteIdentityId = action.payload.remoteIdentity.remote_identity_id;

      return [
        ...state,
        remoteIdentityId,
      ].filter((id, i, initial) => initial.indexOf(id) === i);
    default:
      return state;
  }
}

const initialState = {
  remoteIdentitiesById: {},
  remoteIdentities: [],
};

export default function remoteIdentityReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.RECEIVE_REMOTE_IDENTITY:
      return {
        ...state,
        remoteIdentitiesById: updateRemoteIdentitiesbyId(state.remoteIdentitiesById, action),
        remoteIdentities: updateRemoteIdentities(state.remoteIdentities, action),
      };
    case actions.UPDATE_REMOTE_IDENTITY:
    case actions.CONNECT_REMOTE_IDENTITY:
    case actions.DISCONNECT_REMOTE_IDENTITY:
      return {
        ...state,
        remoteIdentitiesById: updateRemoteIdentitiesbyId(state.remoteIdentitiesById, action),
      };
    default:
      return state;
  }
}
