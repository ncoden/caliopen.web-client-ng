import * as actions from '../action/action-types.js';
import { getNextOffset } from '../reducer/thread-reducer.js';

export function threadMiddleware(DiscussionsActions) {
  'ngInject';

  return store => next => action => {
    const result = next(action);

    if (action.type === actions.LOAD_MORE_THREADS) {
      const offset = getNextOffset(store.getState().threadReducer);
      store.dispatch(DiscussionsActions.fetchThreads(offset));
    }

    return result;
  };
}
