import reducers from '../reducer/reducers.js';

const thunk = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }

  return next(action);
};

const promise = store => next => action => {
  if (typeof action.then === 'function') {
    return action.then(resolved => store.dispatch(resolved));
  }

  return next(action);
};

/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => action => {
  /* eslint-disable no-console */
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  /* eslint-enable no-console */

  return result;
};

/**
 * Sends crash reports as state is updated and listeners are notified.
 */
const crashReporter = () => next => action => {
  try {
    return next(action);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Caught an exception!', err);

    throw err;
  }
};

export function ReduxConfig($ngReduxProvider) {
  'ngInject';

  $ngReduxProvider.createStoreWith(reducers, [
    'ngUiRouterMiddleware',
    'contactMiddleware',
    'tabMiddleware',
    thunk,
    promise,
    logger,
    crashReporter,
  ]);
}
