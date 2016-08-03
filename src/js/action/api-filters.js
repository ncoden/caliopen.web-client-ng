import * as actions from './action-types.js';

export default class ApiFiltersActions {

  updatePrivacyIndexRange({ min, max }) {
    return {
      type: actions.UPDATE_PRIVACY_INDEX_RANGE,
      payload: { min, max },
    };
  }

  updateImportanceLevelRange({ min, max }) {
    return {
      type: actions.UPDATE_IMPORTANCE_LEVEL_RANGE,
      payload: { min, max },
    };
  }
}
