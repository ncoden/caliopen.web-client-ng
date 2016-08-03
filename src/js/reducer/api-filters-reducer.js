import * as actions from '../action/action-types.js';

function rangeReducer(state = { min: 0, max: 100 }, action = {}) {
  switch (action.type) {
    case actions.UPDATE_PRIVACY_INDEX_RANGE:
    case actions.UPDATE_IMPORTANCE_LEVEL_RANGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default function apiFiltersReducer(state = {
  privacyIndexRange: rangeReducer(),
  importanceLevelRange: rangeReducer(),
}, action = {}) {
  switch (action.type) {
    case actions.UPDATE_PRIVACY_INDEX_RANGE:
      return { ...state, privacyIndexRange: rangeReducer(state.privacyIndexRange, action) };
    case actions.UPDATE_IMPORTANCE_LEVEL_RANGE:
      return { ...state, importanceLevelRange: rangeReducer(state.importanceLevelRange, action) };
    default:
      return state;
  }
}
