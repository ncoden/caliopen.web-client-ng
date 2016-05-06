// jQuery must be loaded before angular
import 'jquery';
import angular from 'angular';
import 'jquery-ui/slider';
import 'foundation-sites';
import 'babel-polyfill';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import translate from 'angular-translate';
import 'angular-translate-loader-static-files';
import uiSlider from 'angular-ui-slider';
import ngRedux from 'ng-redux';
import reduxUiRouter from 'redux-ui-router';
import angularFlashAlert from 'angular-flash-alert';
import angularLoadingBar from 'angular-loading-bar';
import angularMoment from 'angular-moment';

export const moduleName = 'caliopenApp';

const app = angular.module(moduleName, [
  uiRouter,
  translate,
  ngSanitize,
  uiSlider,
  ngRedux,
  reduxUiRouter,
  angularFlashAlert,
  angularLoadingBar,
  angularMoment.name,
]);

// config
import { FlashAlertConfig } from './config/flash-alert.js';
import { LoadingBarConfig } from './config/loading-bar.js';
import { ReduxConfig } from './config/redux.js';
import { RouterConfig } from './config/router.js';
import { TranslateConfig } from './config/translate.js';
import { BaseUrlFactory, ApiUrlFactory, ApiInterceptorConfig } from './config/server.js';
import { contactMiddleware } from './middleware/contact-middleware.js';
import { tabMiddleware } from './middleware/tab-middleware.js';

app
  .config(FlashAlertConfig)
  .config(LoadingBarConfig)
  .config(ReduxConfig)
  .config(RouterConfig)
  .config(TranslateConfig)
  .config(ApiInterceptorConfig)
  .factory('BaseUrl', BaseUrlFactory)
  .factory('ApiUrl', ApiUrlFactory)
  .factory('contactMiddleware', contactMiddleware)
  .factory('tabMiddleware', tabMiddleware)
  ;

import { FoundationConfig } from './config/foundation.js';
import { MomentConfig } from './config/moment.js';

app
  .run(FoundationConfig)
  .run(MomentConfig)
  ;

// services
import { ContactsActions } from './action/contacts.js';
import { DiscussionsActions } from './action/discussions.js';
import { TabsActions } from './action/tabs.js';
import { UserActions } from './action/user.js';
import { ApplicationHelper } from './service/helper/application-helper.js';
import { ContactHelper } from './service/helper/contact-helper.js';
import { FlashMessageHelper } from './service/helper/flash-message-helper.js';
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
  .service('FlashMessageHelper', FlashMessageHelper)
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
import { AddAddressFormComponent } from './directive/contact/add-address-form.js';
import { AddEmailFormComponent } from './directive/contact/add-email-form.js';
import { AddImFormComponent } from './directive/contact/add-im-form.js';
import { ContactComponent } from './directive/contact.js';
import { ContactsComponent } from './directive/contacts.js';
import { ContactsContactComponent } from './directive/contacts/contact.js';
import { DiscussionsComponent } from './directive/discussions.js';
import { DiscussionsContactsIconComponent } from './directive/discussions/contacts-icon.js';
import { DiscussionsThreadComponent } from './directive/discussions/thread.js';
import { HeaderComponent } from './directive/header.js';
import { LayoutApplicationSwitcherComponent } from './directive/layout/application-switcher.js';
import { LayoutApplicationWrapperComponent } from './directive/layout/application-wrapper.js';
import { LayoutFlashMessageListComponent } from './directive/layout/flash-message-list.js';
import { LayoutPrivacyIndexSliderComponent } from './directive/layout/privacy-index-slider.js';
import { LayoutImportanceLevelSliderComponent } from './directive/layout/importance-level-slider.js'; // eslint-disable-line max-len
import { LayoutSearchFieldComponent } from './directive/layout/search-field.js';
import { LayoutTabListComponent } from './directive/layout/tab-list.js';
import { LayoutUserMenuComponent } from './directive/layout/user-menu.js';
import { ThreadComponent } from './directive/thread.js';
import { ThreadMessageComponent } from './directive/thread/message.js';
import { WidgetContactAvatarLetterComponent } from './directive/widget/contact/avatar-letter.js';

app
  .component('coAddAddressForm', AddAddressFormComponent)
  .component('coAddEmailForm', AddEmailFormComponent)
  .component('coAddImForm', AddImFormComponent)
  .component('coContact', ContactComponent)
  .component('coContacts', ContactsComponent)
  .component('coContactsContact', ContactsContactComponent)
  .component('coDiscussions', DiscussionsComponent)
  .component('coDiscussionsContactsIcon', DiscussionsContactsIconComponent)
  .component('coDiscussionsThread', DiscussionsThreadComponent)
  .component('coHeader', HeaderComponent)
  .component('coLayoutApplicationSwitcher', LayoutApplicationSwitcherComponent)
  .component('coLayoutApplicationWrapper', LayoutApplicationWrapperComponent)
  .component('coLayoutFlashMessageList', LayoutFlashMessageListComponent)
  .component('coLayoutPrivacyIndexSlider', LayoutPrivacyIndexSliderComponent)
  .component('coLayoutImportanceLevelSlider', LayoutImportanceLevelSliderComponent)
  .component('coLayoutSearchField', LayoutSearchFieldComponent)
  .component('coLayoutTabList', LayoutTabListComponent)
  .component('coLayoutUserMenu', LayoutUserMenuComponent)
  .component('coThread', ThreadComponent)
  .component('coThreadMessage', ThreadMessageComponent)
  .component('widgetContactAvatarLetter', WidgetContactAvatarLetterComponent)
  ;
