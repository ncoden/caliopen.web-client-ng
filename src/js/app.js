let app = angular.module('caliopenApp', [
  'ui.router'
]);

// config
import {RouterConfig} from './config/router.js';

app
  .config(RouterConfig);

// services

import {HeaderDirective} from './directive/header.js';
import {DiscussionsDirective} from './directive/discussions.js';

// directives
app
  .directive('coHeader', HeaderDirective)
  .directive('coDiscussions', DiscussionsDirective);
