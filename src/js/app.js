let app = angular.module('caliopenApp', [
  'ui.router'
]);

// config
import {RouterConfig} from './config/router.js';

app
  .config(RouterConfig);

// services

// directives
