import infiniteScrollDirective from './infinite-scroll.directive.js';

const infiniteScroll = angular.module('infiniteScroll', [])
  .directive('infiniteScroll', infiniteScrollDirective)
  .name;

export default infiniteScroll;
