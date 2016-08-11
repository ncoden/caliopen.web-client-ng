import angular from 'angular';
import ApplicationManagerService from './application-manager.service.js';

const applicationManager = angular.module('application', [])
  .service('ApplicationManager', ApplicationManagerService)
  .name;

export default applicationManager;
