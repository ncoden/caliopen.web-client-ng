// jQuery must be loaded before angular
import 'jquery';
import angular from 'angular';
import 'jquery-ui/ui/widgets/slider';
import 'foundation-sites';
import 'babel-polyfill';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import translate from 'angular-translate';
import 'angular-translate-loader-static-files';
import uiSlider from 'angular-ui-slider';
import uiSelect from 'ui-select';
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
  uiSelect,
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
import { uiSelectCfg } from './config/ui-select.js';
import { contactMiddleware } from './middleware/contact-middleware.js';
import { tabMiddleware } from './middleware/tab-middleware.js';
import { threadMiddleware } from './middleware/thread-middleware.js';
import { protocolsConfig } from './config/protocols-config.js';

app
  .config(FlashAlertConfig)
  .config(LoadingBarConfig)
  .config(ReduxConfig)
  .config(RouterConfig)
  .config(TranslateConfig)
  .config(ApiInterceptorConfig)
  .config(uiSelectCfg)
  .factory('BaseUrl', BaseUrlFactory)
  .factory('ApiUrl', ApiUrlFactory)
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
import { ContactsActions } from './action/contacts.js';
import { DiscussionsActions } from './action/discussions.js';
import { DraftMessageActions } from './action/draft-message.js';
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
  .service('DraftMessageActions', DraftMessageActions)
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
import { protocolStylesheetClassFilter } from './filter/protocol-stylesheet-class.js';

app
  .filter('threadContacts', threadContactsFilter)
  .filter('protocolStylesheetClass', protocolStylesheetClassFilter)
  ;

// components
// -- layout
import { LayoutApplicationSwitcherComponent } from './component/layout/header/application-switcher.js'; // eslint-disable-line max-len
import { LayoutSearchFieldComponent } from './component/layout/header/search-field.js';
import { LayoutUserMenuComponent } from './component/layout/header/user-menu.js';
import { LayoutNavigationAltTabListComponent } from './component/layout/navigation-alt/tab-list.js';
import { LayoutApplicationWrapperComponent } from './component/layout/application-wrapper.js';
import { LayoutFlashMessageListComponent } from './component/layout/flash-message-list.js';
import { LayoutHeaderComponent } from './component/layout/header.js';
import { LayoutImportanceLevelSliderComponent } from './component/layout/importance-level-slider.js'; // eslint-disable-line max-len
import { LayoutNavigationAltComponent } from './component/layout/navigation-alt.js';
import { LayoutPrivacyIndexSliderComponent } from './component/layout/privacy-index-slider.js';
import { LayoutTabListComponent } from './component/layout/tab-list.js';
// -- module
import { avatarLetterComponent } from './component/module/avatar-letter.js';
import { RecipientListComponent } from './component/module/recipient-list.js';
import { RecipientComponent } from './component/module/recipient-list/recipient.js';
// -- section
import { AddAddressFormComponent } from './component/section/contact/add-address-form.js';
import { AddEmailFormComponent } from './component/section/contact/add-email-form.js';
import { AddImFormComponent } from './component/section/contact/add-im-form.js';
import { ContactComponent } from './component/section/contact.js';
import { ContactListComponent } from './component/section/contact-list.js';
import { ContactListContactComponent } from './component/section/contact-list/contact.js';
import { DiscussionsComponent } from './component/section/discussions.js';
import { DiscussionsContactsIconComponent } from './component/section/discussions/contacts-icon.js';
import { DiscussionsThreadComponent } from './component/section/discussions/thread.js';
import { DiscussionDraftComponent } from './component/section/discussion-draft.js';
import { ThreadComponent } from './component/section/thread.js';
import { ThreadMessageComponent } from './component/section/thread/message.js';

app
  // -- layout
  .component('coLayoutApplicationSwitcher', LayoutApplicationSwitcherComponent)
  .component('coLayoutSearchField', LayoutSearchFieldComponent)
  .component('coLayoutUserMenu', LayoutUserMenuComponent)
  .component('coLayoutNavigationAltTabList', LayoutNavigationAltTabListComponent)
  .component('coLayoutApplicationWrapper', LayoutApplicationWrapperComponent)
  .component('coLayoutFlashMessageList', LayoutFlashMessageListComponent)
  .component('coLayoutHeader', LayoutHeaderComponent)
  .component('coLayoutImportanceLevelSlider', LayoutImportanceLevelSliderComponent)
  .component('coLayoutNavigationAlt', LayoutNavigationAltComponent)
  .component('coLayoutPrivacyIndexSlider', LayoutPrivacyIndexSliderComponent)
  .component('coLayoutTabList', LayoutTabListComponent)
  // -- module
  .component('coAvatarLetter', avatarLetterComponent)
  .component('coRecipientList', RecipientListComponent)
  .component('coRecipient', RecipientComponent)
  // -- section
  .component('coAddAddressForm', AddAddressFormComponent)
  .component('coAddEmailForm', AddEmailFormComponent)
  .component('coAddImForm', AddImFormComponent)
  .component('coContact', ContactComponent)
  .component('coContactList', ContactListComponent)
  .component('coContactListContact', ContactListContactComponent)
  .component('coDiscussions', DiscussionsComponent)
  .component('coDiscussionsContactsIcon', DiscussionsContactsIconComponent)
  .component('coDiscussionsThread', DiscussionsThreadComponent)
  .component('coDiscussionDraft', DiscussionDraftComponent)
  .component('coThread', ThreadComponent)
  .component('coThreadMessage', ThreadMessageComponent)
  ;

import { GetFocusDirective } from './directive/get-focus.js';

app
  .directive('getFocus', GetFocusDirective)
  ;
