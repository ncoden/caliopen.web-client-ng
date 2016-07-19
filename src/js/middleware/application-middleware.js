import * as actions from '../action/action-types.js';
import { stateGo } from 'redux-ui-router';

export function applicationMiddleware($state, ApplicationHelper, ApplicationActions) {
  'ngInject';

  return store => next => action => {
    const applicationName = store.getState().applicationReducer.applicationName;


    if (action.type === '@@reduxUiRouter/$stateChangeStart') {
      const nextApplication = ApplicationHelper.getInfosFromRoute(action.payload.toState.name);

      if (!!nextApplication) {
        store.dispatch(ApplicationActions.switchApplication(nextApplication.name));
      }
    }

    let redirectToRoute;

    if (action.type === actions.SWITCH_APPLICATION) {
      if ($state.is(ApplicationHelper.getInfos(applicationName).route)) {
        redirectToRoute = ApplicationHelper.getInfos(action.payload.applicationName).route;
      }
    }

    const result = next(action);

    if (!!redirectToRoute) {
      store.dispatch(stateGo(redirectToRoute));
    }

    return result;
  };
}
