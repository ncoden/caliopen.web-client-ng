import angular from 'angular';
import ngRedux from 'ng-redux';
import NavTabComponent from './nav-tab.component.js';

const navTab = angular.module('navTab', [ngRedux])
  .component('navTab', NavTabComponent)
  .name;

export default navTab;
