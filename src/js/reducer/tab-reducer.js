import * as actions from '../action/action-types.js';

export function tabReducer(state = [], action = {}) {
  switch(action.type) {
    case actions.CREATE_TAB:
      let newStateOnCreation = state.slice();
      newStateOnCreation.push(action.tab);

      return newStateOnCreation;
    case actions.REMOVE_TAB:
      let newStateOnDeletion = state.filter(currentTab => currentTab !== action.tab);

      return newStateOnDeletion;
    default:
      return state;
  }
}
