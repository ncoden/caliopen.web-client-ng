import angular from 'angular';
import ProtocolIconComponent from './protocol-icon.component.js';

const protocolIcon = angular.module('protocolIcon', [])
  .component('protocolIcon', ProtocolIconComponent)
  .name;

export default protocolIcon;
