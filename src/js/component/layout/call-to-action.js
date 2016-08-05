import { createSelector } from 'reselect';

const applicationSelector = createSelector(
  state => state.applicationReducer,
  (applicationReducer) => ({
    applicationName: applicationReducer.applicationName,
  })
);

export class CallToActionController {
  constructor($scope, $ngRedux, $state, $translate, FlashMessageHelper, CaliopenDiscussion) {
    'ngInject';
    this.$state = $state;
    this.$translate = $translate;
    this.FlashMessageHelper = FlashMessageHelper;
    this.CaliopenDiscussion = CaliopenDiscussion;

    $scope.$on('$destroy', $ngRedux.connect(applicationSelector)(this));
  }

  $onInit() {
    const ACTIONS = [
      {
        route: 'front.contacts',
        picto: 'fa fa-plus',
        label: 'call-to-action.action.create_contact',
        application: 'contacts',
        action: () => this.FlashMessageHelper.info(
          'Contact creation not yet implemented.',
          { timeout: 10000 }
        ),
      },
      {
        route: 'front.contact',
        picto: 'fa fa-comment-o',
        label: 'call-to-action.action.compose_contact',
        disabled: true,
        action: () => this.FlashMessageHelper.info(
          'Compose to contact is not yet implemented.',
          { timeout: 10000 }
        ),
      },
      {
        route: 'front.discussions',
        picto: 'fa fa-plus',
        label: 'call-to-action.action.compose',
        application: 'discussions',
        action: () => this.CaliopenDiscussion.newDraft(),
      },
      {
        route: 'front.thread',
        picto: 'fa fa-reply',
        label: 'call-to-action.action.reply',
        disabled: true,
        action: () => this.FlashMessageHelper.info(
          'Reply to thread is not yet implemented.',
          { timeout: 10000 }
        ),
      },
    ];

    this.principalAction = ACTIONS.reduce((prev, action) => {
      if (this.$state.is(action.route)) {
        return action;
      }

      if (this.applicationName === action.application) {
        return action;
      }

      return prev;
    });

    this.availableActions = ACTIONS.filter(
      action =>
        !this.$state.is(action.route) && !!action.application && action !== this.principalAction
    );
  }

  setFocus($event) {
    $event.element[0].focus();
  }
}

export const LayoutsCallToActionComponent = {
  controller: CallToActionController,
  /* eslint-disable max-len */
  template: `
    <div class="l-call-to-action m-call-to-action" hm-press="$ctrl.setFocus($event)">
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
