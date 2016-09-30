import { enums } from 'openpgp';

class OpenPGPKeyController {
  constructor(OpenPGPManager) {
    'ngInject';
    this.OpenPGPManager = OpenPGPManager;
    this.keyStatuses = enums.keyStatus;
  }

  $onChanges(changes) {
    if (!!changes.publicKeyArmored && !!this.publicKeyArmored) {
      this.initPublicKeyViewValues(this.OpenPGPManager.getKeyFromASCII(this.publicKeyArmored));
    }
  }

  initPublicKeyViewValues(publicKey) {
    this.fingerprint = publicKey.primaryKey.fingerprint;
    this.userId = publicKey.getPrimaryUser().user.userId.userid;
    this.createdAt = publicKey.primaryKey.created;
    this.expirationTime = publicKey.getExpirationTime();
    this.algorithm = publicKey.primaryKey.algorithm;
    this.bitSize = publicKey.primaryKey.getBitSize();
    this.userIds = publicKey.users.map(user => user.userId.userid);
    this.keyStatus = Object.keys(this.keyStatuses)
      .find(statusLiteral => this.keyStatuses[statusLiteral] === publicKey.verifyPrimaryKey());
  }
}

const OpenPGPKeyComponent = {
  bindings: {
    publicKeyArmored: '<',
    privateKeyArmored: '<?',
    editMode: '<',
    onDeleteKey: '&',
  },
  transclude: {
    icon: 'icon',
  },
  controller: OpenPGPKeyController,
  template: `
    <div class="m-openpgp-key">
      <div class="m-openpgp-key__main">
        <div class="m-openpgp-key__icon" ng-transclude="icon"></div>
        <div class="m-openpgp-key__fingerprint">{{ $ctrl.fingerprint }}</div>

        <div class="m-openpgp-key__actions">
          <a class="m-link m-link--button"
            ng-class="{'m-openpgp-key__toggle-info--warning': $ctrl.keyStatus !== 'valid'}"
            ng-click="$ctrl.showDetails = !$ctrl.showDetails"
          >
            <span class="fa fa-info-circle"></span>
            <span class="fa fa-caret-down"></span>
            <span class="show-for-sr">{{ 'openpgp.action.toggle-details'|translate }}</span>
          </a>
          <button type="button"
            ng-if="$ctrl.editMode"
            class="m-link m-link--button m-link--alert"
            ng-click="$ctrl.onDeleteKey({ $event: { fingerprint: $ctrl.fingerprint } })"
          >
            <span class="fa fa-remove"></span>
            <span class="show-for-sr">{{ 'openpgp.action.remove-key'|translate }}</span>
          </button>
        </div>
      </div>

      <div class="m-openpgp-key__summary" ng-if="!$ctrl.showDetails">
        <span>{{ $ctrl.userId }}</span>
        <span>{{ $ctrl.createdAt|amDateFormat:'ll' }}</span>
        <span ng-if="$ctrl.expirationTime.length">
          / {{ $ctrl.expirationTime|amDateFormat:'ll' }}
        </span>
        <span ng-if="$ctrl.keyStatus !== 'valid'">
        {{ ('openpgp.status.' + $ctrl.keyStatus)|translate }}
        </span>
      </div>

      <div ng-if="!!$ctrl.showDetails" class="m-openpgp-key__details">
        <dl class="m-openpgp-key__detail m-def-list">
          <dt class="m-def-list__title">{{ 'openpgp.details.identities'|translate }}</dt>
          <dd class="m-def-list__def" ng-repeat="userid in $ctrl.userIds">{{ userid }}</dd>
          <dt class="m-def-list__title">{{ 'openpgp.details.algorithm'|translate }}</dt>
          <dd class="m-def-list__def">{{ $ctrl.algorithm }}</dd>
          <dt class="m-def-list__title">{{ 'openpgp.details.key-size'|translate }}</dt>
          <dd class="m-def-list__def">{{ $ctrl.bitSize }}</dd>
          <dt class="m-def-list__title">{{ 'openpgp.details.status'|translate }}</dt>
          <dd class="m-def-list__def">{{ ('openpgp.status.' + $ctrl.keyStatus)|translate }}</dd>
          <dt class="m-def-list__title">{{ 'openpgp.details.creation'|translate }}</dt>
          <dd class="m-def-list__def">{{ $ctrl.createdAt|amDateFormat:'ll' }}</dd>
          <dt class="m-def-list__title">{{ 'openpgp.details.expiration'|translate }}</dt>
          <dd class="m-def-list__def">{{ $ctrl.expirationTime|amDateFormat:'ll' }}</dd>
        </dl>

        <div class="m-openpgp-key__detail">
          <textarea-field-group
            label="'openpgp.public-key'|translate"
            model="$ctrl.publicKeyArmored"
          ></textarea-field-group>
        </div>
        <div class="m-openpgp-key__detail">
          <textarea-field-group
            ng-if="!!$ctrl.privateKeyArmored"
            label="'openpgp.private-key'|translate"
            model="$ctrl.privateKeyArmored"
          ></textarea-field-group>
        </div>
      </div>
    </div>
  `,
};

export default OpenPGPKeyComponent;
