import angular from 'angular';
import form from '../form';
import subtitle from '../subtitle';
import openPGPManagerConfig from './openpgp-manager.config.js';
import OpenPGPManagerService from './openpgp-manager.service.js';
import OpenPGPKeyComponent from './openpgp-key/openpgp-key.component.js';

const openPGPManager = angular.module('openpgp-manager', [form, subtitle])
  .config(openPGPManagerConfig)
  .service('OpenPGPManager', OpenPGPManagerService)
  .component('openpgpKey', OpenPGPKeyComponent)
  .name;

export default openPGPManager;
