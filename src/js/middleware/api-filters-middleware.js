import * as actions from '../action/action-types.js';

export function apiFiltersMiddleware($state, $http, DiscussionsActions, ContactsActions,
  FlashMessage) {
  'ngInject';

  const applyApiFilterHeader = (header, range) => {
    // eslint-disable-next-line no-param-reassign
    $http.defaults.headers.common = {
      ...$http.defaults.headers.common,
      [header]: `${range.min};${range.max}`,
    };
  };

  return store => next => action => {
    const result = next(action);
    const isApiFilteringAction = [
      actions.UPDATE_PRIVACY_INDEX_RANGE,
      actions.UPDATE_IMPORTANCE_LEVEL_RANGE,
    ].indexOf(action.type) !== -1;

    if (action.type === actions.UPDATE_PRIVACY_INDEX_RANGE) {
      applyApiFilterHeader('X-Caliopen-PI', store.getState().apiFiltersReducer.privacyIndexRange);
    }

    if (action.type === actions.UPDATE_IMPORTANCE_LEVEL_RANGE) {
  // applyApiFilterHeader('X-Caliopen-IL', store.getState().apiFiltersReducer.importanceLevelRange);
    }

    if (isApiFilteringAction) {
      FlashMessage.info(
        'The filtering feature is not yet available. '
        // + 'Actually you can filter contact list by privacy.' // or not; I can't see it working
        , { timeout: 10000 }
      );
    }

    const statesActions = {
      discussions: () => DiscussionsActions.invalidateThreads(),
      'contact-list': () => ContactsActions.invalidateContacts(),
    };
    const stateRequiresAction = Object.keys(statesActions)
      .find(state => $state.is(state));

    if (isApiFilteringAction && stateRequiresAction) {
      store.dispatch(statesActions[stateRequiresAction]());
    }

    return result;
  };
}
