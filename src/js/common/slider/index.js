import angular from 'angular';
import rzSlider from './rzslider.module.js';
import sliderConfig from './slider.config.js';

const slider = angular.module('slider', [rzSlider])
  .run(sliderConfig)
  .name;

export default slider;
