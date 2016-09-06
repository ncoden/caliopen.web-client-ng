import remoteIdentityReducer from './remote-identity-reducer.js';
import * as actions from '../../../src/js/action/action-types.js';

describe('Reducer remoteIdentity Reducer', () => {
  const initialState = remoteIdentityReducer();
  const remoteIdentityBase = {
    remote_identity_id: '000-001',
    is_fetching: false,
    connected: false,
    connection_required: false,
    cancel_fetch_required: false,
    identity_type: 'email',
    identity_id: '100-001',
    params: {
      login: 'foo',
      password: 'bar',
    },
  };

  it('init state', () => {
    expect(initialState).toEqual({ remoteIdentities: [], remoteIdentitiesById: { } });
  });

  it('reduce RECEIVE_REMOTE_IDENTITY', () => {
    const action = {
      type: actions.RECEIVE_REMOTE_IDENTITY,
      payload: {
        remoteIdentity: remoteIdentityBase,
      },
    };

    const state = remoteIdentityReducer(initialState, action);
    expect(state.remoteIdentities.length).toEqual(1);
    expect(state.remoteIdentities[0]).toEqual('000-001');
    expect(JSON.stringify(state.remoteIdentitiesById['000-001']))
      .toEqual(JSON.stringify(remoteIdentityBase));
  });

  it('reduce UPDATE_REMOTE_IDENTITY', () => {
    const remoteIdentity = {
      ...remoteIdentityBase,
      remote_identity_id: '000-002',
    };

    const action = {
      type: actions.UPDATE_REMOTE_IDENTITY,
      payload: {
        remoteIdentity,
      },
    };
    const state = remoteIdentityReducer(initialState, action);

    expect(state.remoteIdentities.length).toEqual(0);
    expect(JSON.stringify(state.remoteIdentitiesById['000-002']))
      .toEqual(JSON.stringify(remoteIdentity));
  });

  it('reduce CONNECT_REMOTE_IDENTITY', () => {
    const remoteIdentity = {
      ...remoteIdentityBase,
      remote_identity_id: '000-003',
    };

    let state = remoteIdentityReducer(initialState, {
      type: actions.RECEIVE_REMOTE_IDENTITY,
      payload: { remoteIdentity },
    });

    const action = {
      type: actions.CONNECT_REMOTE_IDENTITY,
      payload: { remoteIdentity },
    };

    state = remoteIdentityReducer(state, action);
    expect(JSON.stringify(state.remoteIdentitiesById['000-003'])).toEqual(JSON.stringify({
      ...remoteIdentity,
      is_fetching: true,
      connected: false,
      connection_required: true,
      cancel_fetch_required: false,
    }));
  });

  it('reduce DISCONNECT_REMOTE_IDENTITY', () => {
    const remoteIdentity = {
      ...remoteIdentityBase,
      remote_identity_id: '000-004',
      is_fetching: true,
      connected: true,
      connection_required: true,
      cancel_fetch_required: false,
    };

    let state = remoteIdentityReducer(initialState, {
      type: actions.RECEIVE_REMOTE_IDENTITY,
      payload: { remoteIdentity },
    });

    const action = {
      type: actions.DISCONNECT_REMOTE_IDENTITY,
      payload: { remoteIdentity },
    };

    state = remoteIdentityReducer(state, action);
    expect(JSON.stringify(state.remoteIdentitiesById['000-004'])).toEqual(JSON.stringify({
      ...remoteIdentity,
      is_fetching: true,
      connected: true,
      connection_required: false,
      cancel_fetch_required: true,
    }));
  });
});
