class RemoteIdentityEmailController {
  constructor(FlashMessage, $translate) {
    'ngInject';

    this.FlashMessage = FlashMessage;
    this.$translate = $translate;
  }

  $onInit() {
    this.phase = 1;
    this.maxPhase = 3;
    this.formErrors = {};
    this.mailProtocols = ['IMAP', 'POP'];
    this.fetchMethods = [];
    this.remoteIdentity = {
      ...this.remoteIdentity,
      identity_type: 'email',
      identity_id: this.contactSubObjectId,
      connection_required: true,
    };

    const fetchMethods = ['from_now', 'fetch_all'].reduce((prev, value) => ({
      ...prev,
      [`remote_identity.fetch_method.${value}`]: value,
    }), {});

    this.$translate(Object.keys(fetchMethods)).then(translations => {
      this.fetchMethods = Object.keys(translations).map(key => ({
        label: translations[key],
        value: fetchMethods[key],
      }));
    });
  }

  $onChanges(changes) {
    if (!!changes.remoteIdentity) {
      this.remoteIdentity = { ...this.remoteIdentity };
    }
  }

  updateParams(property, $event) {
    this.remoteIdentity = {
      ...this.remoteIdentity,
      params: {
        ...this.remoteIdentity.params,
        [property]: $event.model,
      },
    };
  }

  previous() {
    this.phase--;
  }

  next() {
    if (this.validate({ phase: this.phase })) {
      this.phase++;
    }
  }

  disconnect() {
    this.onDisconnect({ $event: { remoteIdentity: this.remoteIdentity } });
  }

  finish() {
    if (!this.validate({ phase: 3 })) {
      return this.$translate('remote_identity.feedback.errors_in_form')
        .then(label => this.FlashMessage.warning(label));
    }

    this.phase = 1;

    return this.onConnect({
      $event: {
        remoteIdentity: this.remoteIdentity,
      },
    });
  }

  validate({ phase }) {
    let isValid = true;

    const phaseValidation = (properties) => {
      properties.forEach(({ formProperty, error }) => {
        const value = !!this.remoteIdentity
          && this.remoteIdentity.params
          && this.remoteIdentity.params[formProperty];

        if (!value || value.length === 0) {
          this.formErrors[formProperty] = [error];
          isValid = false;
        } else {
          this.formErrors[formProperty] = [];
        }
      });
    };

    if (phase >= 1) {
      phaseValidation([
        { formProperty: 'login', error: 'login is required' },
        { formProperty: 'password', error: 'password is required' },
      ]);
    }
    if (phase >= 2) {
      phaseValidation([
        { formProperty: 'mailProtocol', error: 'protocol is required' },
        { formProperty: 'incommingMailServer', error: 'mail server is required' },
        { formProperty: 'mailPort', error: 'port is required' },
      ]);
    }
    if (phase >= 3) {
      phaseValidation([
        { formProperty: 'fetchMethod', error: 'Fetch method must be defined' },
      ]);
    }

    return isValid;
  }
}

const RemoteIdentityEmailComponent = {
  controller: RemoteIdentityEmailController,
  bindings: {
    remoteIdentity: '<',
    contactSubObjectId: '<',
    onConnect: '&',
    onDisconnect: '&',
    props: '<',
  },
  template: `
    <div class="m-remote-identity">
      <h4 class="m-remote-identity__title">
        {{ 'remote_identity.form_legend'|translate }}
      </h4>
      <div
        ng-if="$ctrl.remoteIdentity.is_fetching"
        class="m-remote-identity__fetching-panel"
        ng-class="$ctrl.props.stylesheets.fetchingPanel"
      >
        <div ng-class="$ctrl.props.stylesheets.fetchingPanelContent">
          <spinner loading="true"></spinner>
          <p class="m-remote-identity__fetching-panel-text">
            {{ 'remote_identity.feedback.loading_messages'|translate }}
          </p>
          <button type="button"
            ng-disabled="$ctrl.remoteIdentity.cancel_fetch_required"
            ng-click="$ctrl.disconnect()"
            class="button alert"
          >
            {{ 'remote_identity.action.cancel'|translate }}
          </button>
        </div>
      </div>
      <form ng-if="!$ctrl.remoteIdentity.is_fetching"
        ng-switch="$ctrl.phase"
        class="m-remote-identity__form"
      >
        <div ng-switch-default ng-class="$ctrl.props.stylesheets.formRow">
          <div ng-class="$ctrl.props.stylesheets.fieldGroup">
            <text-field-group label="'remote_identity.form.login.label'|translate"
              model="$ctrl.remoteIdentity.params.login"
              errors="$ctrl.formErrors.login"
              on-change="$ctrl.updateParams('login', $event)"
              required="required"
            ></text-field-group>
          </div>
          <div ng-class="$ctrl.props.stylesheets.fieldGroup">
            <text-field-group label="'remote_identity.form.password.label'|translate"
              props="{ type: 'password' }"
              model="$ctrl.remoteIdentity.params.password"
              errors="$ctrl.formErrors.password"
              on-change="$ctrl.updateParams('password', $event)"
              required="required"
            ></text-field-group>
          </div>
        </div>
        <div ng-switch-when="2" ng-class="$ctrl.props.stylesheets.formRow">
          <div ng-class="$ctrl.props.stylesheets.fieldGroup">
            <select-field-group
              label="'remote_identity.form.protocol.label'|translate"
              model="$ctrl.remoteIdentity.params.mailProtocol"
              options="$ctrl.mailProtocols"
              errors="$ctrl.formErrors.mailProtocol"
              on-change="$ctrl.updateParams('mailProtocol', $event)"
              required="require"
            ></select-field-group>
          </div>
          <div ng-class="$ctrl.props.stylesheets.fieldGroup">
            <text-field-group label="'remote_identity.form.incomming_mail_server.label'|translate"
              model="$ctrl.remoteIdentity.params.incommingMailServer"
              errors="$ctrl.formErrors.incommingMailServer"
              on-change="$ctrl.updateParams('incommingMailServer', $event)"
              required="required"
            ></text-field-group>
          </div>
          <div ng-class="$ctrl.props.stylesheets.fieldGroup">
            <text-field-group label="'remote_identity.form.port.label'|translate"
              model="$ctrl.remoteIdentity.params.mailPort"
              errors="$ctrl.formErrors.mailPort"
              on-change="$ctrl.updateParams('mailPort', $event)"
              required="required"
            ></text-field-group>
          </div>
        </div>
        <div ng-switch-when="3" ng-class="$ctrl.props.stylesheets.formRow">
          <div ng-class="$ctrl.props.stylesheets.fieldGroup">
            <radio-field-group
              model="$ctrl.remoteIdentity.params.fetchMethod"
              options="$ctrl.fetchMethods"
              errors="$ctrl.formErrors.fetchMethod"
              on-change="$ctrl.updateParams('fetchMethod', $event)"
            ></radio-field-group>
          </div>
        </div>
        <div ng-class="$ctrl.props.stylesheets.formRow">
          <div ng-class="$ctrl.props.stylesheets.buttons">
            <button type="button" ng-show="$ctrl.remoteIdentity.connected"
              ng-disabled="$ctrl.remoteIdentity.cancel_fetch_required"
              ng-click="$ctrl.disconnect()"
              class="button alert"
            >
              {{ 'remote_identity.action.disconnect'|translate }}
            </button>
            <button type="button" ng-show="$ctrl.phase > 1" ng-click="$ctrl.previous()"
              class="button hollow primary"
            >
              {{'remote_identity.action.back'|translate}}
            </button>
            <button type="button" ng-show="$ctrl.phase < $ctrl.maxPhase"
              ng-click="$ctrl.next()" class="button primary"
            >
              {{'remote_identity.action.next'|translate}}
            </button>
            <button type="button" ng-show="$ctrl.phase === $ctrl.maxPhase"
              ng-click="$ctrl.finish()"
              class="button secondary"
            >
              {{'remote_identity.action.finish'|translate}}
            </button>
          </div>
        </div>
      </form>
    </div>
  `,
};

export default RemoteIdentityEmailComponent;
