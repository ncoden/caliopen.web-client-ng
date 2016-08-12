import angular from 'angular';
import StylesheetHelper from './stylesheet-helper.service.js';

const stylesheetHelper = angular.module('stylesheetHelper', [])
  .service('StylesheetHelper', StylesheetHelper)
  .name;

export default stylesheetHelper;
