// jQuery must be loaded before angular
import 'jquery';
import angular from 'angular';
import 'jquery-ui/slider';
import 'bootstrap-sass';
import 'babel-polyfill';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import translate from 'angular-translate';
import 'angular-translate-loader-static-files';
import uiSlider from 'angular-ui-slider';
import ngRedux from 'ng-redux';
import reduxUiRouter from 'redux-ui-router';
import angularMoment from 'angular-moment';
import angularLoadingBar from 'angular-loading-bar';

export const moduleName = 'caliopenApp';

const app = angular.module(moduleName, [
  uiRouter,
  translate,
  ngSanitize,
  uiSlider,
  ngRedux,
  angularMoment.name,
  reduxUiRouter,
  angularLoadingBar,
]);

// config
import { LoadingBarConfig } from './config/loading-bar.js';
import { ReduxConfig } from './config/redux.js';
import { RouterConfig } from './config/router.js';
import { TranslateConfig } from './config/translate.js';
import { BaseUrlFactory, ApiUrlFactory, ApiInterceptorConfig } from './config/server.js';
import { tabMiddleware } from './middleware/tab-middleware.js';

app
  .config(LoadingBarConfig)
  .config(ReduxConfig)
  .config(RouterConfig)
  .config(TranslateConfig)
  .config(ApiInterceptorConfig)
  .factory('BaseUrl', BaseUrlFactory)
  .factory('ApiUrl', ApiUrlFactory)
  .factory('tabMiddleware', tabMiddleware)
  ;

import { MomentConfig } from './config/moment.js';

app
  .run(MomentConfig)
  ;

// services
import { ContactsActions } from './action/contacts.js';
import { DiscussionsActions } from './action/discussions.js';
import { TabsActions } from './action/tabs.js';
import { UserActions } from './action/user.js';
import { ApplicationHelper } from './service/helper/application-helper.js';
import { ContactHelper } from './service/helper/contact-helper.js';
import { TabHelper } from './service/helper/tab-helper.js';
import { ContactRepository } from './service/repository/contact.js';
import { MessageRepository } from './service/repository/message.js';
import { ThreadRepository } from './service/repository/thread.js';
import { UserRepository } from './service/repository/user.js';

app
  .service('ContactsActions', ContactsActions)
  .service('DiscussionsActions', DiscussionsActions)
  .service('TabsActions', TabsActions)
  .service('UserActions', UserActions)
  .service('ApplicationHelper', ApplicationHelper)
  .service('ContactHelper', ContactHelper)
  .service('TabHelper', TabHelper)
  .service('ContactRepository', ContactRepository)
  .service('MessageRepository', MessageRepository)
  .service('ThreadRepository', ThreadRepository)
  .service('UserRepository', UserRepository)
  ;

// filters
import { threadContactsFilter } from './filter/thread-contacts.js';

app
  .filter('threadContacts', threadContactsFilter);

// directives
import { ContactDirective } from './directive/contact.js';
import { ContactsDirective } from './directive/contacts.js';
import { ContactsContactDirective } from './directive/contacts/contact.js';
import { DiscussionsDirective } from './directive/discussions.js';
import { DiscussionsContactsIconDirective } from './directive/discussions/contacts-icon.js';
import { DiscussionsThreadDirective } from './directive/discussions/thread.js';
import { HeaderDirective } from './directive/header.js';
import { LayoutApplicationSwitcherDirective } from './directive/layout/application-switcher.js';
import { LayoutApplicationWrapperDirective } from './directive/layout/application-wrapper.js';
import { LayoutPrivacyIndexSliderDirective } from './directive/layout/privacy-index-slider.js';
import { LayoutImportanceLevelSliderDirective } from './directive/layout/importance-level-slider.js'; // eslint-disable-line max-len
import { LayoutSearchFieldDirective } from './directive/layout/search-field.js';
import { LayoutTabListDirective } from './directive/layout/tab-list.js';
import { LayoutUserMenuDirective } from './directive/layout/user-menu.js';
import { ThreadDirective } from './directive/thread.js';
import { ThreadMessageDirective } from './directive/thread/message.js';
import { WidgetContactAvatarLetterDirective } from './directive/widget/contact/avatar-letter.js';

app
  .directive('coContact', ContactDirective)
  .directive('coContacts', ContactsDirective)
  .directive('coContactsContact', ContactsContactDirective)
  .directive('coDiscussions', DiscussionsDirective)
  .directive('coDiscussionsContactsIcon', DiscussionsContactsIconDirective)
  .directive('coDiscussionsThread', DiscussionsThreadDirective)
  .directive('coHeader', HeaderDirective)
  .directive('coLayoutApplicationSwitcher', LayoutApplicationSwitcherDirective)
  .directive('coLayoutApplicationWrapper', LayoutApplicationWrapperDirective)
  .directive('coLayoutPrivacyIndexSlider', LayoutPrivacyIndexSliderDirective)
  .directive('coLayoutImportanceLevelSlider', LayoutImportanceLevelSliderDirective)
  .directive('coLayoutSearchField', LayoutSearchFieldDirective)
  .directive('coLayoutTabList', LayoutTabListDirective)
  .directive('coLayoutUserMenu', LayoutUserMenuDirective)
  .directive('coThread', ThreadDirective)
  .directive('coThreadMessage', ThreadMessageDirective)
  .directive('widgetContactAvatarLetter', WidgetContactAvatarLetterDirective)
  ;
