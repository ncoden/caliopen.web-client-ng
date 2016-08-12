export const UNKNOWN_PROTOCOL_TYPE = 'unknown';
export const PROTOCOLS = {
  unknown: 'fa fa-question-circle',
  sms: 'fa fa-mobile',
  email: 'fa fa-envelope',
  facebook: 'fa fa-facebook',
};

class ProtocolIconController {
  $onChanges() {
    const type = (!!this.protocol.type) ? this.protocol.type : UNKNOWN_PROTOCOL_TYPE;

    this.protocolClass = PROTOCOLS[type];
  }
}

const ProtocolIconComponent = {
  controller: ProtocolIconController,
  bindings: {
    protocol: '<',
  },
  template: `
    <span ng-class="$ctrl.protocolClass"></span>
  `,
};

export default ProtocolIconComponent;
