import angular from 'angular';
import ngRedux from 'ng-redux';
import HeaderComponent from './header.component.js';
import SearchFieldComponent from './search-field/search-field.component.js';
import UserMenuComponent from './user-menu/user-menu.component.js';

const header = angular.module('header', [ngRedux])
  .component('header', HeaderComponent)
  .component('searchField', SearchFieldComponent)
  .component('userMenu', UserMenuComponent)
  .name;

export default header;
