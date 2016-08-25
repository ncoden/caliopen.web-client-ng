import * as actions from '../action/action-types.js';

export function userMiddleware(UserActions) {
  'ngInject';

  return store => next => action => {
    const result = next(action);

    if (action.type === actions.INVALIDATE_USER) {
      store.dispatch(UserActions.fetchUser());
    }

    return result;
  };
}
