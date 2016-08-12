import angular from 'angular';
import applicationManager from '../application-manager';
import avatarLetter from '../avatar-letter';
import NavigationAltComponent from './navigation-alt.component.js';
import TabListComponent from './tab-list/tab-list.component.js';

const navigationAlt = angular.module('navigationAlt', [applicationManager, avatarLetter])
  .component('navigationAlt', NavigationAltComponent)
  .component('tabListAlt', TabListComponent)
  .name;

export default navigationAlt;
