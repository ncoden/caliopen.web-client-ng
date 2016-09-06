import { v1 as uuidV1 } from 'uuid';
import * as actions from '../action/action-types.js';

export function remoteIdentityMiddleware(FlashMessage, RemoteIdentityActions, $timeout) {
  'ngInject';

  return (store) => next => action => {
    const fakeFetching = (remoteIdentityId) => {
      FlashMessage.info(`
        Connecting to a protocol is not yet implemented.
        Data fetching is fake actually.
      `, { timeout: 10000 });

      $timeout(() => {
        const remoteIdentity = store.getState()
          .remoteIdentityReducer.remoteIdentitiesById[remoteIdentityId];

        store.dispatch(RemoteIdentityActions.receiveRemoteIdentity({
          ...remoteIdentity,
          is_fetching: true,
          connected: true,
        }));
      }, 5000);

      $timeout(() => {
        const remoteIdentity = store.getState()
        .remoteIdentityReducer.remoteIdentitiesById[remoteIdentityId];

        store.dispatch(RemoteIdentityActions.receiveRemoteIdentity({
          ...remoteIdentity,
          is_fetching: false,
        }));
      }, 5000);
    };

    const result = next(action);

    if (action.type === actions.ADD_REMOTE_IDENTITY) {
      const remoteIdentity = {
        ...action.payload.remoteIdentity,
        remote_identity_id: uuidV1(),
        is_fetching: true,
      };
      store.dispatch(RemoteIdentityActions.receiveRemoteIdentity(remoteIdentity));
      fakeFetching(remoteIdentity.remote_identity_id);
    }

    if (action.type === actions.CONNECT_REMOTE_IDENTITY) {
      fakeFetching(
        action.payload.remoteIdentity.remote_identity_id
      );
    }

    if (action.type === actions.DISCONNECT_REMOTE_IDENTITY) {
      const { remote_identity_id } = action.payload.remoteIdentity;
      $timeout(() => {
        const remoteIdentity = store.getState()
          .remoteIdentityReducer.remoteIdentitiesById[remote_identity_id];

        store.dispatch(RemoteIdentityActions.receiveRemoteIdentity({
          ...remoteIdentity,
          is_fetching: false,
          connected: false,
        }));
      }, 3000);
    }

    return result;
  };
}
