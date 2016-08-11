// jQuery must be loaded before angular
import 'jquery';
import angular from 'angular';
import 'foundation-sites';
import 'babel-polyfill';
import ngSanitize from 'angular-sanitize';
import translate from 'angular-translate';
import 'angular-translate-loader-static-files';
import uiSelect from 'ui-select';
import ngRedux from 'ng-redux';
import reduxUiRouter from 'redux-ui-router';
import angularLoadingBar from 'angular-loading-bar';
import angularMoment from 'angular-moment';
import ngReduxDevTools from 'ng-redux-dev-tools';

import flashMessage from './common/flash-message';
import layout from './common/layout';
import contactCard from './component/contact-card';
import contactList from './component/contact-list';
import discussionDraft from './component/discussion-draft';
import discussions from './component/discussions';
import thread from './component/thread';
import AppComponent from './app.component.js';

export const moduleName = 'caliopenApp';

const app = angular.module(moduleName, [
  translate,
  ngSanitize,
  uiSelect,
  ngRedux,
  reduxUiRouter,
  angularLoadingBar,
  angularMoment.name,
  ngReduxDevTools,

  flashMessage,
  layout,
  contactCard,
  contactList,
  discussionDraft,
  discussions,
  thread,
]);

app.component('app', AppComponent);

// config
import { LoadingBarConfig } from './config/loading-bar.js';
import { ReduxConfig } from './config/redux.js';
import { TranslateConfig } from './config/translate.js';
import { BaseUrlFactory, ApiUrlFactory, ApiInterceptorConfig } from './config/server.js';
import { uiSelectCfg } from './config/ui-select.js';
import { apiFiltersMiddleware } from './middleware/api-filters-middleware.js';
import { applicationMiddleware } from './middleware/application-middleware.js';
import { contactMiddleware } from './middleware/contact-middleware.js';
import { tabMiddleware } from './middleware/tab-middleware.js';
import { threadMiddleware } from './middleware/thread-middleware.js';
import { protocolsConfig } from './config/protocols-config.js';

app
  .config(LoadingBarConfig)
  .config(ReduxConfig)
  .config(TranslateConfig)
  .config(ApiInterceptorConfig)
  .config(uiSelectCfg)
  .factory('BaseUrl', BaseUrlFactory)
  .factory('ApiUrl', ApiUrlFactory)
  .factory('apiFiltersMiddleware', apiFiltersMiddleware)
  .factory('applicationMiddleware', applicationMiddleware)
  .factory('contactMiddleware', contactMiddleware)
  .factory('tabMiddleware', tabMiddleware)
  .factory('threadMiddleware', threadMiddleware)
  .value('protocolsConfig', protocolsConfig)
  ;

import { MomentConfig } from './config/moment.js';
import { uiSelectTemplate } from './config/ui-select.js';
import { UserConfig } from './config/user.js';

app
  .run(MomentConfig)
  .run(uiSelectTemplate)
  .run(UserConfig)
  ;

// services
import ApiFiltersActions from './action/api-filters.js';
import ApplicationActions from './action/application.js';
import ContactsActions from './action/contacts.js';
import DiscussionsActions from './action/discussions.js';
import DraftMessageActions from './action/draft-message.js';
import TabsActions from './action/tabs.js';
import UserActions from './action/user.js';
import { TabHelper } from './service/helper/tab-helper.js';
import { ContactRepository } from './service/repository/contact.js';
import { MessageRepository } from './service/repository/message.js';
import { ThreadRepository } from './service/repository/thread.js';
import { UserRepository } from './service/repository/user.js';

app
  .service('ApiFiltersActions', ApiFiltersActions)
  .service('ApplicationActions', ApplicationActions)
  .service('ContactsActions', ContactsActions)
  .service('DiscussionsActions', DiscussionsActions)
  .service('DraftMessageActions', DraftMessageActions)
  .service('TabsActions', TabsActions)
  .service('UserActions', UserActions)
  .service('TabHelper', TabHelper)
  .service('ContactRepository', ContactRepository)
  .service('MessageRepository', MessageRepository)
  .service('ThreadRepository', ThreadRepository)
  .service('UserRepository', UserRepository)
  ;

// filters
import { threadContactsFilter } from './filter/thread-contacts.js';

app
  .filter('threadContacts', threadContactsFilter)
  ;

export default moduleName;
