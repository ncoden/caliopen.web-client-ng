import angular from 'angular';
import ngRedux from 'ng-redux';
import applicationManager from '../application-manager';
import slider from '../slider';
import navTab from '../nav-tab';
import NavigationComponent from './navigation.component.js';
import ApplicationSwitcherComponent from './application-switcher/application-switcher.component.js';
import SlidersContainerComponent from './sliders/sliders-container.component.js';
import SlidersComponent from './sliders/sliders.component.js';
import TabListComponent from './tab-list/tab-list.component.js';
import HorizontalScrollDirective from './tab-list/horizontal-scroll.directive.js';
import stickyNavbarClassDirective from './sticky-navbar-class.directive.js';

const navigation = angular.module('navigation', [ngRedux, applicationManager, slider, navTab])
  .component('navigation', NavigationComponent)
  .component('applicationSwitcher', ApplicationSwitcherComponent)
  .component('slidersContainer', SlidersContainerComponent)
  .component('sliders', SlidersComponent)
  .component('tabList', TabListComponent)
  .directive('horizontalScroll', HorizontalScrollDirective)
  .directive('stickyNavbarClass', stickyNavbarClassDirective)
  .name;

export default navigation;
