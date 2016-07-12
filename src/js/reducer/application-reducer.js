import * as actions from '../action/action-types.js';

export default function applicationReducer(state = {
  applicationName: 'discussions',
}, action) {
  switch (action.type) {
    case actions.SWITCH_APPLICATION:
      return { applicationName: action.payload.applicationName };
    default:
      return state;
  }
}
