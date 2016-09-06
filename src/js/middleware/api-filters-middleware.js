import * as actions from '../action/action-types.js';

const HEADER_PI = 'X-Caliopen-PI';
const HEADER_IL = 'X-Caliopen-IL';

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

    if (action.type === actions.INIT_API_FILTERS) {
      applyApiFilterHeader(HEADER_PI, store.getState().apiFiltersReducer.privacyIndexRange);
      applyApiFilterHeader(HEADER_IL, store.getState().apiFiltersReducer.importanceLevelRange);
    }

    if (action.type === actions.UPDATE_IMPORTANCE_LEVEL_RANGE) {
      FlashMessage.info(
        'Filtering by importance is not yet available.'
        , { timeout: 10000 }
      );
    }

    if (action.type === actions.UPDATE_PRIVACY_INDEX_RANGE && $state.is('contact-list')) {
      FlashMessage.info(
        'Filtering by privacy index is not yet available on contact list.'
        , { timeout: 10000 }
      );
    }

    if (isApiFilteringAction) {
      applyApiFilterHeader(HEADER_PI, store.getState().apiFiltersReducer.privacyIndexRange);
      applyApiFilterHeader(HEADER_IL, store.getState().apiFiltersReducer.importanceLevelRange);
      store.dispatch((dispatch) => {
        dispatch(DiscussionsActions.invalidateThreads());
        dispatch(ContactsActions.invalidateContacts());
      });
    }

    return result;
  };
}
