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

// directives

import {DiscussionsDirective} from './directive/discussions.js';
import {HeaderDirective} from './directive/header.js';
import {LayoutApplicationSwitcherDirective} from './directive/layout/application-switcher.js';
import {LayoutApplicationWrapperDirective} from './directive/layout/application-wrapper.js';
import {LayoutPrivacyIndexSliderDirective} from './directive/layout/privacy-index-slider.js';
import {LayoutImportanceLevelSliderDirective} from './directive/layout/importance-level-slider.js';

app
  .directive('coDiscussions', DiscussionsDirective)
  .directive('coHeader', HeaderDirective)
  .directive('coLayoutApplicationSwitcher', LayoutApplicationSwitcherDirective)
  .directive('coLayoutApplicationWrapper', LayoutApplicationWrapperDirective)
  .directive('coLayoutPrivacyIndexSlider', LayoutPrivacyIndexSliderDirective)
  .directive('coLayoutImportanceLevelSlider', LayoutImportanceLevelSliderDirective)
  ;
