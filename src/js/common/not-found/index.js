import angular from 'angular';
import NotFoundComponent from './not-found.component.js';

const notFound = angular.module('notFound', [])
  .component('notFound', NotFoundComponent)
  .name;

export default notFound;
