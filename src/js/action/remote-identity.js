import * as actions from './action-types.js';

export default class RemoteIdentityActions {

  receiveRemoteIdentity(remoteIdentity) {
    return {
      type: actions.RECEIVE_REMOTE_IDENTITY,
      payload: { remoteIdentity },
    };
  }

  addRemoteIdentity(remoteIdentity) {
    return {
      type: actions.ADD_REMOTE_IDENTITY,
      payload: { remoteIdentity },
    };
  }

  updateRemoteIdentityParams(remoteIdentity) {
    return {
      type: actions.UPDATE_REMOTE_IDENTITY,
      payload: { remoteIdentity },
    };
  }

  connect(remoteIdentity) {
    return {
      type: actions.CONNECT_REMOTE_IDENTITY,
      payload: { remoteIdentity },
    };
  }

  disconnect(remoteIdentity) {
    return {
      type: actions.DISCONNECT_REMOTE_IDENTITY,
      payload: { remoteIdentity },
    };
  }
}
