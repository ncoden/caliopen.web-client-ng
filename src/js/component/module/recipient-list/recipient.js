import { KEY } from '../recipient-list.js';
import { createSelector } from 'reselect';

import { UNKNOWN_PROTOCOL_TYPE } from '../../../filter/protocol-stylesheet-class.js';
const PRIVACY_COMPARISON_CLASSES = {
  equal: 'fa-circle-o',
  better: 'fa-arrow-circle-o-up m-recipient__col-protocol-comparison--high',
  lower: 'fa-arrow-circle-o-down m-recipient__col-protocol-comparison--low',
};


export const findObjectIndex = (items, selected, keysToTest = []) => items.findIndex((item) => {
  const testedKeys = keysToTest.length ? keysToTest : Object.keys(item);

  if (!keysToTest.length && Object.keys(item).length !== Object.keys(selected).length) {
    return false;
  }

  return testedKeys.reduce((previousResult, currentKey) => {
    if (!previousResult) {
      return false;
    }

    return item[currentKey] === selected[currentKey];
  }, true);
});

const contactSelector = createSelector(
  [
    (state, props) => state.contactReducer.contactsById[props.contactId],
    (state, props) => state.contactReducer.protocolsById[props.contactId],
    (state, props) => props.protocolsConfig,
    (state, props) => findObjectIndex(
      state.contactReducer.protocolsById[props.contactId],
      props.activeProtocol
    ),
  ],
  (contact, contactProtocols, protocolsConfig, activeProtocolIndex) => {
    const availableProtocols = contactProtocols
      .filter((protocol) => !!protocolsConfig[protocol.type]);

    return {
      contact,
      availableProtocols,
      activeProtocolIndex,
    };
  }
);

export class RecipientController {

  constructor($window, $timeout, $scope, $ngRedux, protocolsConfig) {
    'ngInject';
    this.$window = $window;
    this.$timeout = $timeout;
    this.$scope = $scope;
    this.$ngRedux = $ngRedux;
    this.protocolsConfig = protocolsConfig;
  }

  $onInit() {
    this.protocol = { ...this.recipient.protocol };
    this.availableProtocols = Object.keys(this.protocolsConfig).map((type) => ({ type }));
    this.activeProtocolIndex = this.getActiveProtocolIndex();
    this.UNKNOWN_PROTOCOL_TYPE = UNKNOWN_PROTOCOL_TYPE;

    if (!!this.recipient.contact_id) {
      this.$scope.$on('$destroy', this.$ngRedux.connect(
        (state) => contactSelector(state, {
          contactId: this.recipient.contact_id,
          availableProtocols: this.availableProtocols,
          protocolsConfig: this.protocolsConfig,
          activeProtocol: this.protocol,
        })
      )(this));
    }
  }

  $postLink() {
    this.$timeout(() => {
      const $recipientDropdown = angular.element(`#dropdown_${this.recipient.recipient_id}`);
      // eslint-disable-next-line no-new
      const zfDropdown = new this.$window.Foundation.Dropdown($recipientDropdown, {
        closeOnClick: true,
      });

      const $body = angular.element(this.$window.document.body);
      zfDropdown.$element.on('show.zf.dropdown', () => {
        $body.on('keydown', (ev) => {
          const key = ev.which;
          const items = this.availableProtocols;

          switch (key) {
            case KEY.UP:
              ev.preventDefault();
              if (this.activeProtocolIndex > 0) {
                this.$scope.$apply(() => {
                  this.activeProtocolIndex--;
                });
              }
              break;
            case KEY.DOWN:
              ev.preventDefault();
              if (this.activeProtocolIndex < items.length - 1) {
                this.$scope.$apply(() => {
                  this.activeProtocolIndex++;
                });
              }
              break;
            case KEY.ESC:
              this.activeProtocolIndex = this.getActiveProtocolIndex();
              zfDropdown.close();
              break;
            default:
              break;
          }

          if ([KEY.ENTER, KEY.TAB].indexOf(key) !== -1) {
            this.setActiveProtocol();
          }
        });
      });

      zfDropdown.$element.on('hide.zf.dropdown', () => {
        $body.off('keydown');
      });

      this.$scope.$on('recipient.protocol.updated', () => {
        zfDropdown.close();
      });

      this.$scope.$on('$destroy', () => {
        $body.off('keydown');
        zfDropdown.$element.off('show.zf.dropdown');
      });
    });
  }

  getActiveProtocolIndex() {
    return findObjectIndex(this.availableProtocols, this.protocol, ['type']);
  }

  setUnkownRecipientProtocolType(type) {
    this.protocol = { ...this.protocol, type };
    this.activeProtocolIndex = this.getActiveProtocolIndex();
    this.updateProtocol();
    this.$scope.$broadcast('recipient.protocol.updated');
  }

  setKnownRecipientProtocol(protocol) {
    this.protocol = protocol;
    this.updateProtocol();
    this.$scope.$broadcast('recipient.protocol.updated');
  }

  setActiveProtocol() {
    if (!!this.contact) {
      this.setKnownRecipientProtocol(this.availableProtocols[this.activeProtocolIndex]);
    } else {
      this.setUnkownRecipientProtocolType(this.availableProtocols[this.activeProtocolIndex].type);
    }
  }

  updateProtocol() {
    this.onChangeRecipient({ recipient: { ...this.recipient, protocol: this.protocol } });
  }

  getPrivacyComparison(protocol) {
    if (protocol.privacy_index > this.protocol.privacy_index) {
      return 'better';
    }

    if (protocol.privacy_index < this.protocol.privacy_index) {
      return 'lower';
    }

    return 'equal';
  }

  getPrivacyComparisonIconClasses(protocol) {
    return PRIVACY_COMPARISON_CLASSES[this.getPrivacyComparison(protocol)];
  }
}

export const RecipientComponent = {
  bindings: {
    recipient: '<',
    searchTerms: '<',
    onChangeRecipient: '&',
    onRemoveRecipient: '&',
    onEditRecipient: '&',
  },
  require: {
    rcptListCtrl: '^coRecipientList',
  },
  controller: RecipientController,
  /* eslint-disable max-len */
  template: `
    <div class="m-badge m-badge--low m-badge--large">
      <a class="m-link m-link--button"
         ng-class="{ 'm-link--alert': $ctrl.protocol.type === $ctrl.UNKNOWN_PROTOCOL_TYPE }"
         data-toggle="dropdown_{{ $ctrl.recipient.recipient_id }}"
         aria-label="{{ 'messages.compose.action.toggle-recipient-options'|translate }}"
      >
        <span class="fa" ng-class="$ctrl.protocol|protocolStylesheetClass"></span>
        <span>{{ $ctrl.recipient.name || $ctrl.protocol.identifier }}</span>
        <span class="fa fa-chevron-down"></span>
      </a>
      <div class="m-dropdown bottom m-recipient__m-dropdown"
           id="dropdown_{{ $ctrl.recipient.recipient_id }}"
           data-dropdown
           data-close-on-click="false"
           ng-keyup="$ctrl.onDropdownKeyup($event)"
      >
        <ul class="m-menu m-menu--vertical">
          <li ng-repeat="protocol in $ctrl.availableProtocols"
              class="m-menu__item m-menu--vertical__item"
          >
            <a class="m-menu__item-content m-link"
              ng-if="!$ctrl.contact"
              ng-class="{'is-active': $index === $ctrl.activeProtocolIndex}"
              ng-click="$ctrl.setUnkownRecipientProtocolType(protocol.type)"
            >
              <span class="fa" ng-class="protocol|protocolStylesheetClass"></span>
              {{ ('messages.compose.protocol.' + protocol.type)|translate }}
            </a>
            <a class="m-recipient__row-protocol m-menu__item-content m-link"
              ng-if="!!$ctrl.contact"
              ng-class="{'is-active': $index === $ctrl.activeProtocolIndex}"
              ng-click="$ctrl.setKnownRecipientProtocol(protocol)"
            >
              <span class="m-recipient__col-protocol-identifier ">
                <span class="fa" ng-class="protocol|protocolStylesheetClass"></span>
                <i>{{ protocol.identifier }}</i>
              </span>
              <span class="m-recipient__col-protocol-comparison">
                <span class="fa float-right m-recipient__col-protocol-comparison-icon"
                      ng-class="$ctrl.getPrivacyComparisonIconClasses(protocol)"
                ></span>
                <span class="sr-only">
                  {{ ('messages.compose.privacy_comparison.' + $ctrl.getPrivacyComparison(protocol))|translate }}
                </span>
              </span>
            </a>
          </li>
        </ul>
        <div class="m-recipient__row-actions">
          <a class="m-recipient__col-edit m-link m-link--button"
            ng-click="$ctrl.onEditRecipient({ recipient: $ctrl.recipient })"
          >
            <span class="fa fa-edit"></span>
            {{ 'messages.compose.action.edit-recipient'|translate }}
          </a>
          <a class="m-recipient__col-remove m-link m-link--button"
            ng-click="$ctrl.onRemoveRecipient({ recipient: $ctrl.recipient })"
          >
            <span class="fa fa-close"></span>
            {{ 'messages.compose.action.remove-recipient'|translate }}
          </a>
        </div>
      </div>
    </div>
  `,
  /* eslint-enable max-len */
};
