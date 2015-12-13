import * as actions from '../action/action-types.js';

export function applicationReducer(state = {
  name: undefined,
  route: undefined
}, action = {}) {
  switch(action.type) {
    case actions.SELECT_APPLICATION:
      console.log('action', action);
      return Object.assign({}, state, {
        name: action.application.name,
        route: action.application.route
      });
    default:
      return state;
  }
}
