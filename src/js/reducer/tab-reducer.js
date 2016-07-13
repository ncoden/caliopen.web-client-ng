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

const tabReducer = combineReducers({
  tabs: tabsReducer,
});

export default tabReducer;
