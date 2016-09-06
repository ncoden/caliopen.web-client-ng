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

export function ReduxConfig($ngReduxProvider, devToolsServiceProvider) {
  'ngInject';

  $ngReduxProvider.createStoreWith(reducers, [
    'ngUiRouterMiddleware',
    'apiFiltersMiddleware',
    'applicationMiddleware',
    'contactMiddleware',
    'tabMiddleware',
    'threadMiddleware',
    'userMiddleware',
    'remoteIdentityMiddleware',
    thunk,
    promise,
    crashReporter,
  ], [devToolsServiceProvider.instrument()]
  );
}
