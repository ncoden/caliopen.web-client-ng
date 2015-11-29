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

import {HeaderDirective} from './directive/header.js';
import {DiscussionsDirective} from './directive/discussions.js';

// directives
app
  .directive('coHeader', HeaderDirective)
  .directive('coDiscussions', DiscussionsDirective);
