import angular from 'angular';
import OffCanvasComponent from './off-canvas.component.js';

const offCanvas = angular.module('offCanvas', [])
  .component('offCanvas', OffCanvasComponent)
  .name;

export default offCanvas;
