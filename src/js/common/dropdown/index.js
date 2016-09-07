import angular from 'angular';
import DropdownComponent from './dropdown.component.js';

const dropdown = angular.module('dropdown', [])
  .component('dropdown', DropdownComponent)
  .name;

export default dropdown;
