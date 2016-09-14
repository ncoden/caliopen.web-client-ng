import angular from 'angular';
import SubtitleComponent from './subtitle.component.js';

const subtitle = angular.module('subtitle', [])
  .component('subtitle', SubtitleComponent)
  .name;

export default subtitle;
