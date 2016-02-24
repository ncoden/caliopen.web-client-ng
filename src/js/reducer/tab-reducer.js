import {combineReducers} from 'redux';
import * as actions from '../action/action-types.js';

export const tabReducer = combineReducers({
  tabs: tabsReducer,
  selected: selectTabReducer
});

function tabsReducer(state = [], action = {}) {
  switch(action.type) {
    case actions.ADD_TAB:
      let addState = state.slice();
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
    return action.tabId;
  }

  return state;
}
