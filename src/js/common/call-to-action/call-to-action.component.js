import { createSelector } from 'reselect';

const applicationSelector = createSelector(
  state => state.applicationReducer,
  (applicationReducer) => ({ applicationName: applicationReducer.applicationName })
);

const routerSelector = createSelector(
  state => state.router.currentState,
  currentState => ({ currentStateName: currentState.name })
);

const actionsSelector = createSelector(
  [
    state => applicationSelector(state).applicationName,
    state => routerSelector(state).currentStateName,
    (state, props) => props.actions,
  ],
  (applicationName, currentStateName, actions) => {
    const principalAction = actions.reduce((prev, action) => {
      if (action.route === currentStateName) {
        return action;
      }

      if (!prev && applicationName === action.application) {
        return action;
      }

      return prev;
    }, undefined);

    const availableActions = actions.filter(
      action =>
        action.route !== currentStateName && !!action.application && action !== principalAction
    );

    return { principalAction, availableActions };
  }
);

export class CallToActionController {
  constructor($scope, $ngRedux, FlashMessage, DiscussionDraft) {
    'ngInject';
    this.$scope = $scope;
    this.$ngRedux = $ngRedux;
    this.FlashMessage = FlashMessage;
    this.DiscussionDraft = DiscussionDraft;
  }

  $onInit() {
    const actions = [
      {
        route: 'contact-list',
        picto: 'fa fa-user',
        label: 'call-to-action.action.create_contact',
        application: 'contacts',
        action: () => this.FlashMessage.info(
          'Contact creation not yet implemented.',
          { timeout: 10000 }
        ),
      },
      {
        route: 'contact',
        picto: 'fa fa-comment-o',
        label: 'call-to-action.action.compose_contact',
        disabled: true,
        action: () => this.FlashMessage.info(
          'Compose to contact is not yet implemented.',
          { timeout: 10000 }
        ),
      },
      {
        route: 'discussions',
        picto: 'fa fa-plus',
        label: 'call-to-action.action.compose',
        application: 'discussions',
        action: () => this.DiscussionDraft.newDraft(),
      },
      {
        route: 'thread',
        picto: 'fa fa-reply',
        label: 'call-to-action.action.reply',
        disabled: true,
        action: () => this.FlashMessage.info(
          'Reply to thread is not yet implemented.',
          { timeout: 10000 }
        ),
      },
    ];

    this.$scope.$on('$destroy', this.$ngRedux.connect(
      (state) => actionsSelector(state, { actions })
    )(this));
  }

  setFocus($event) {
    $event.element[0].focus();
  }
}

const CallToActionComponent = {
  controller: CallToActionController,
  /* eslint-disable max-len */
  template: `
    <div class="m-call-to-action" hm-press="$ctrl.setFocus($event)">
      <a ng-repeat="action in $ctrl.availableActions"
         class="m-call-to-action__btn button"
         ng-class="{'m-call-to-action__btn--disabled': !!action.disabled}"
         ng-click="action.action()"
      >
        <span ng-class="action.picto"></span>
        <span>{{ action.label|translate }}</span>
      </a>

      <a class="m-call-to-action__btn m-call-to-action__btn--principal button"
         ng-class="{'m-call-to-action__btn--disabled': !!$ctrl.principalAction.disabled}"
         hm-tap="$ctrl.principalAction.action()"
      >
        <span class="" ng-class="$ctrl.principalAction.picto"></span>
        <span class="">{{ $ctrl.principalAction.label|translate }}</span>
      </a>
    </div>
  `,
  /* eslint-enable max-len */
};

export default CallToActionComponent;
