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
import rzSlider from './directive/rzslider.js';
import uiSelect from 'ui-select';
import ngRedux from 'ng-redux';
import reduxUiRouter from 'redux-ui-router';
import angularFlashAlert from 'angular-flash-alert';
import angularHammer from 'angular-hammer';
import angularLoadingBar from 'angular-loading-bar';
import angularMoment from 'angular-moment';

export const moduleName = 'caliopenApp';

const app = angular.module(moduleName, [
  uiRouter,
  translate,
  ngSanitize,
  rzSlider,
  uiSelect,
  ngRedux,
  reduxUiRouter,
  angularFlashAlert,
  angularHammer,
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
import { apiFiltersMiddleware } from './middleware/api-filters-middleware.js';
import { applicationMiddleware } from './middleware/application-middleware.js';
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
import { SliderConfig } from './config/slider.js';

app
  .run(MomentConfig)
  .run(uiSelectTemplate)
  .run(UserConfig)
  .run(SliderConfig)
  ;

// services
import ApiFiltersActions from './action/api-filters.js';
import ApplicationActions from './action/application.js';
import ContactsActions from './action/contacts.js';
import DiscussionsActions from './action/discussions.js';
import DraftMessageActions from './action/draft-message.js';
import TabsActions from './action/tabs.js';
import UserActions from './action/user.js';
import { CaliopenDiscussion } from './service/caliopen/discussion.js';
import { ApplicationHelper } from './service/helper/application-helper.js';
import { ContactHelper } from './service/helper/contact-helper.js';
import { FlashMessageHelper } from './service/helper/flash-message-helper.js';
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
  .service('CaliopenDiscussion', CaliopenDiscussion)
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
import { LayoutSearchFieldComponent } from './component/layout/header/search-field.js';
import { LayoutUserMenuComponent } from './component/layout/header/user-menu.js';
import { LayoutNavigationAltTabListComponent } from './component/layout/navigation-alt/tab-list.js';
import { LayoutApplicationWrapperComponent } from './component/layout/application-wrapper.js';
import { LayoutsCallToActionComponent } from './component/layout/call-to-action.js';
import { LayoutFlashMessageListComponent } from './component/layout/flash-message-list.js';
import { LayoutHeaderComponent } from './component/layout/header.js';
import { LayoutNavigationApplicationSwitcherComponent } from './component/layout/navigation/application-switcher.js'; // eslint-disable-line max-len
import { LayoutNavigationSlidersContainerComponent } from './component/layout/navigation/sliders-container.js'; // eslint-disable-line max-len
import { LayoutNavigationSlidersComponent } from './component/layout/navigation/sliders.js';
import { LayoutNavigationTabListComponent } from './component/layout/navigation/tab-list.js';
import { LayoutNavigationAltComponent } from './component/layout/navigation-alt.js';
// -- module
import { AvatarLetterComponent } from './component/module/avatar-letter.js';
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
  .component('coLayoutSearchField', LayoutSearchFieldComponent)
  .component('coLayoutUserMenu', LayoutUserMenuComponent)
  .component('coLayoutNavigationAltTabList', LayoutNavigationAltTabListComponent)
  .component('coLayoutApplicationWrapper', LayoutApplicationWrapperComponent)
  .component('coLayoutCallToAction', LayoutsCallToActionComponent)
  .component('coLayoutFlashMessageList', LayoutFlashMessageListComponent)
  .component('coLayoutHeader', LayoutHeaderComponent)
  .component('coLayoutNavigationApplicationSwitcher', LayoutNavigationApplicationSwitcherComponent)
  .component('coLayoutNavigationSlidersContainer', LayoutNavigationSlidersContainerComponent)
  .component('coLayoutNavigationSliders', LayoutNavigationSlidersComponent)
  .component('coLayoutNavigationTabList', LayoutNavigationTabListComponent)
  .component('coLayoutNavigationAlt', LayoutNavigationAltComponent)
  // -- module
  .component('coAvatarLetter', AvatarLetterComponent)
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
import { HorizontalScrollDirective } from './directive/horizontal-scroll.js';

app
  .directive('getFocus', GetFocusDirective)
  .directive('horizontalScroll', HorizontalScrollDirective)
  ;
