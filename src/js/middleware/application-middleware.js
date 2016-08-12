import * as actions from '../action/action-types.js';
import { stateGo } from 'redux-ui-router';

export function applicationMiddleware($state, ApplicationManager, ApplicationActions) {
  'ngInject';

  return store => next => action => {
    const applicationName = store.getState().applicationReducer.applicationName;


    if (action.type === '@@reduxUiRouter/$stateChangeStart') {
      const nextApplication = ApplicationManager.getInfosFromRoute(action.payload.toState.name);

      if (!!nextApplication) {
        store.dispatch(ApplicationActions.switchApplication(nextApplication.name));
      }
    }

    let redirectToRoute;

    if (action.type === actions.SWITCH_APPLICATION) {
      if ($state.is(ApplicationManager.getInfos(applicationName).route)) {
        redirectToRoute = ApplicationManager.getInfos(action.payload.applicationName).route;
      }
    }

    const result = next(action);

    if (!!redirectToRoute) {
      store.dispatch(stateGo(redirectToRoute));
    }

    return result;
  };
}
