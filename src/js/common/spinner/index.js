import angular from 'angular';
import SpinnerComponent from './spinner.component.js';

const spinner = angular.module('spinner', [])
  .component('spinner', SpinnerComponent)
  .name;

export default spinner;
