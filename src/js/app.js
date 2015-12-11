window.jQuery = require('jquery');
require('jquery-ui/slider');
require('bootstrap-sass');
require('babel-polyfill');
require('angular');
const ngSanitize = require('angular-sanitize');
const uiRouter = require('angular-ui-router');
const translate = require('angular-translate');
require('angular-translate-loader-static-files');
const uiSlider = require('angular-ui-slider');
const ngRedux = require('ng-redux');
const angularMoment = require('angular-moment');

let app = angular.module('caliopenApp', [
  uiRouter,
  translate,
  ngSanitize,
  uiSlider,
  ngRedux,
  angularMoment.name,
]);

// config
import {ReduxConfig} from './config/redux.js';
import {RouterConfig} from './config/router.js';
import {TranslateConfig} from './config/translate.js';
import {BaseUrlFactory, ApiUrlFactory} from './config/server.js';

app
  .config(ReduxConfig)
  .config(RouterConfig)
  .config(TranslateConfig)
  .factory('BaseUrl', BaseUrlFactory)
  .factory('ApiUrl', ApiUrlFactory)
  ;

import {MomentConfig} from './config/moment.js';

app
  .run(MomentConfig)
  ;

// services
import {ContactsActions} from './action/contacts.js';
import {DiscussionsActions} from './action/discussions.js';
import {ContactHelper} from './service/helper/contact-helper.js';
import {ContactRepository} from './service/repository/contact.js';
import {MessageRepository} from './service/repository/message.js';
import {ThreadRepository} from './service/repository/thread.js';

app
  .service('ContactsActions', ContactsActions)
  .service('DiscussionsActions', DiscussionsActions)
  .service('ContactHelper', ContactHelper)
  .service('ContactRepository', ContactRepository)
  .service('MessageRepository', MessageRepository)
  .service('ThreadRepository', ThreadRepository)
  ;

// directives
import {ContactDirective} from './directive/contact.js';
import {ContactsDirective} from './directive/contacts.js';
import {DiscussionsDirective} from './directive/discussions.js';
import {DiscussionsContactsIconDirective} from './directive/discussions/contacts-icon.js';
import {DiscussionsThreadDirective} from './directive/discussions/thread.js';
import {HeaderDirective} from './directive/header.js';
import {LayoutApplicationSwitcherDirective} from './directive/layout/application-switcher.js';
import {LayoutApplicationWrapperDirective} from './directive/layout/application-wrapper.js';
import {LayoutPrivacyIndexSliderDirective} from './directive/layout/privacy-index-slider.js';
import {LayoutImportanceLevelSliderDirective} from './directive/layout/importance-level-slider.js';
import {ThreadDirective} from './directive/thread.js';
import {ThreadMessageDirective} from './directive/thread/message.js';
import {WidgetContactAvatarLetterDirective} from './directive/widget/contact/avatar-letter.js';

app
  .directive('coContact', ContactDirective)
  .directive('coContacts', ContactsDirective)
  .directive('coDiscussions', DiscussionsDirective)
  .directive('coDiscussionsContactsIcon', DiscussionsContactsIconDirective)
  .directive('coDiscussionsThread', DiscussionsThreadDirective)
  .directive('coHeader', HeaderDirective)
  .directive('coLayoutApplicationSwitcher', LayoutApplicationSwitcherDirective)
  .directive('coLayoutApplicationWrapper', LayoutApplicationWrapperDirective)
  .directive('coLayoutPrivacyIndexSlider', LayoutPrivacyIndexSliderDirective)
  .directive('coLayoutImportanceLevelSlider', LayoutImportanceLevelSliderDirective)
  .directive('coThread', ThreadDirective)
  .directive('coThreadMessage', ThreadMessageDirective)
  .directive('widgetContactAvatarLetter', WidgetContactAvatarLetterDirective)
  ;
