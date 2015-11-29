let app = angular.module('caliopenApp', [
  'ui.router',
  'pascalprecht.translate',
  'ngSanitize',
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

app
  .directive('coDiscussions', DiscussionsDirective)
  .directive('coHeader', HeaderDirective)
  .directive('coLayoutApplicationSwitcher', LayoutApplicationSwitcherDirective)
  ;
