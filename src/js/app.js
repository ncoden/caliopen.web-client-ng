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
import account from './component/account';
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
  account,
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
import { openPGPMiddleware } from './middleware/openpgp-middleware.js';
import { tabMiddleware } from './middleware/tab-middleware.js';
import { threadMiddleware } from './middleware/thread-middleware.js';
import { userMiddleware } from './middleware/user-middleware.js';
import { remoteIdentityMiddleware } from './middleware/remote-identity-middleware.js';
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
  .factory('openPGPMiddleware', openPGPMiddleware)
  .factory('tabMiddleware', tabMiddleware)
  .factory('threadMiddleware', threadMiddleware)
  .factory('userMiddleware', userMiddleware)
  .factory('remoteIdentityMiddleware', remoteIdentityMiddleware)
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
import OpenPGPActions from './action/openpgp.js';
import TabsActions from './action/tabs.js';
import RemoteIdentityActions from './action/remote-identity.js';
import UserActions from './action/user.js';
import { ContactRepository } from './service/repository/contact.js';
import { MessageRepository } from './service/repository/message.js';
import { OpenPGPKeychainRepository } from './service/repository/openpgp-keychain.js';
import { ThreadRepository } from './service/repository/thread.js';
import { UserRepository } from './service/repository/user.js';
import LocalStorageHelper from './service/local-storage-helper.js';

app
  .service('ApiFiltersActions', ApiFiltersActions)
  .service('ApplicationActions', ApplicationActions)
  .service('ContactsActions', ContactsActions)
  .service('DiscussionsActions', DiscussionsActions)
  .service('DraftMessageActions', DraftMessageActions)
  .service('OpenPGPActions', OpenPGPActions)
  .service('TabsActions', TabsActions)
  .service('RemoteIdentityActions', RemoteIdentityActions)
  .service('UserActions', UserActions)
  .service('ContactRepository', ContactRepository)
  .service('MessageRepository', MessageRepository)
  .service('OpenPGPKeychainRepository', OpenPGPKeychainRepository)
  .service('ThreadRepository', ThreadRepository)
  .service('UserRepository', UserRepository)
  .service('LocalStorageHelper', LocalStorageHelper)
  ;

// filters
import { threadContactsFilter } from './filter/thread-contacts.js';

app
  .filter('threadContacts', threadContactsFilter)
  ;

export default moduleName;
