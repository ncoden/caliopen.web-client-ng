import { combineReducers } from 'redux';
import * as actions from '../action/action-types.js';

function tabsReducer(state = [], action = {}) {
  let addState = undefined;
  switch (action.type) {
    case actions.ADD_TAB:
      addState = state.slice();
      addState.push(action.tab);

      return addState;
    case actions.REMOVE_TAB:
      return state.filter(currentTab => currentTab !== action.tab);
    default:
      return state;
  }
}

function selectTabReducer(state = null, action) {
  if (action.type === actions.SELECT_TAB) {
    return action.tab;
  }

  return state;
}

export const tabReducer = combineReducers({
  tabs: tabsReducer,
  selected: selectTabReducer,
});
