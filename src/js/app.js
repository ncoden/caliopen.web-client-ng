window.jQuery = require('jquery');
require('jquery-ui/slider');
require('bootstrap-sass');
require('angular');
const ngSanitize = require('angular-sanitize');
const uiRouter = require('angular-ui-router');
const translate = require('angular-translate');
require('angular-translate-loader-static-files');
const uiSlider = require('angular-ui-slider');

let app = angular.module('caliopenApp', [
  uiRouter,
  translate,
  ngSanitize,
  uiSlider,
]);

// config
import {RouterConfig} from './config/router.js';
import {TranslateConfig} from './config/translate.js';

app
  .config(TranslateConfig)
  .config(RouterConfig)
  ;

// services

import {ContactHelper} from './service/helper/contact-helper.js';

app
  .service('ContactHelper', ContactHelper)
  ;

// directives

import {ContactDirective} from './directive/contact.js';
import {ContactsDirective} from './directive/contacts.js';
import {DiscussionsDirective} from './directive/discussions.js';
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
  .directive('coHeader', HeaderDirective)
  .directive('coLayoutApplicationSwitcher', LayoutApplicationSwitcherDirective)
  .directive('coLayoutApplicationWrapper', LayoutApplicationWrapperDirective)
  .directive('coLayoutPrivacyIndexSlider', LayoutPrivacyIndexSliderDirective)
  .directive('coLayoutImportanceLevelSlider', LayoutImportanceLevelSliderDirective)
  .directive('coThread', ThreadDirective)
  .directive('coThreadMessage', ThreadMessageDirective)
  .directive('widgetContactAvatarLetter', WidgetContactAvatarLetterDirective)
  ;
