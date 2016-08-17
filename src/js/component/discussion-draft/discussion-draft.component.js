import { createSelector } from 'reselect';

const messageDraftSelector = createSelector(
  (state) => state.draftMessageReducer.draftMessagesById,
  (state) => state.router.currentParams.message_id,
  (draftMessageReducer, messageId) => draftMessageReducer[messageId]
);
const DEFAULT_PI = 50;
const SAVE_BODY_THROTTLE = 2 * 1000;

export class DiscussionDraftController {
  constructor($scope, $ngRedux, $timeout, DraftMessageActions) {
    'ngInject';
    this.$scope = $scope;
    this.$ngRedux = $ngRedux;
    this.$timeout = $timeout;
    this.DraftMessageActions = DraftMessageActions;
  }

  $onInit() {
    this.$scope.$on('$destroy', this.$ngRedux.connect((state) => {
      const draftMessage = messageDraftSelector(state);

      if (!draftMessage) {
        return {};
      }

      return {
        draftMessage: { ...draftMessage },
        body: draftMessage.body,
        recipients: [...draftMessage.recipients],
        PIProgressMeterStyle: { width: `${this.calcPIForRecipients(draftMessage.recipients)}%` },
      };
    })(this));
  }

  calcPIForRecipients(recipients = []) {
    if (recipients.length === 0) {
      return DEFAULT_PI;
    }

    return recipients
      .reduce((prev, recipient) => prev + recipient.protocol.privacy_index, 0) / recipients.length;
  }

  recipientsHasChanged(recipients) {
    this.draftMessage.recipients = recipients;
    this.$ngRedux.dispatch(
      this.DraftMessageActions.updateDraftMessage(
        this.draftMessage.message_id, this.draftMessage
      )
    );
  }

  bodyHasChanged() {
    const draftMessage = { ...this.draftMessage, body: this.body };
    this.$timeout.cancel(this.timeoutPromise);
    this.timeoutPromise = this.$timeout(() => this.save(draftMessage), SAVE_BODY_THROTTLE);
  }

  save(draftMessage) {
    this.$ngRedux.dispatch(
      this.DraftMessageActions.updateDraftMessage(
        draftMessage.message_id, draftMessage
      )
    );
  }
}

const DiscussionDraftComponent = {
  controller: DiscussionDraftController,
  /* eslint-disable max-len */
  template: `
    <div class="s-discussion-draft">
      <div class="s-discussion-draft__m-flash-message m-flash-message m-flash-message--warning">
        This feature is not yet available. Fake contacts will popup like Bender or Zoidberg.<br/>
        Please enjoy the UI/UX and give feedbacks; Thanks.
      </div>
      <form ng-if="!!$ctrl.draftMessage">
        <div class="s-discussion-draft__top-row">
          <div class="s-discussion-draft__m-action-bar m-action-bar hide-for-small-only">
            <button class="button primary m-action-bar__button">
              {{ 'messages.compose.action.send'|translate }}
            </button>
            <button class="button secondary m-action-bar__button" ng-click="$ctrl.save()">
              {{ 'messages.compose.action.save'|translate}}
            </button>
          </div>
          <div class="s-discussion-draft__pi">
            <label title="{{ 'messages.compose.privacy_index.title'|translate }}"
                   class="s-discussion-draft__pi-label m-text--privacy fa fa-shield"></label>
            <div class="s-discussion-draft__m-pi-progress m-pi-progress progress"
                 role="progressbar" tabindex="0" aria-valuenow="0" aria-valuemin="0"
                 aria-valuemax="100"
            >
              <div class="m-pi-progress__progress-meter progress-meter"
                   ng-class="{ 'm-pi-progress--disabled__progress-meter': !$ctrl.draftMessage || !$ctrl.draftMessage.recipients.length }"
                   ng-style="$ctrl.PIProgressMeterStyle"></div>
            </div>
          </div>
        </div>
        <div class="s-discussion-draft__recipients-row">
          <div class="s-discussion-draft__recipients"
               aria-label="{{ 'messages.compose.form.to.label'|translate }}"
           >
            <recipient-list
              recipients="$ctrl.recipients"
              on-recipients-change="$ctrl.recipientsHasChanged(recipients)"
            ></recipient-list>
          </div>
        </div>
        <div class="s-discussion-draft__body-row">
          <label class="sr-only">{{ 'messages.compose.form.body.label'|translate }}</label>
          <div class="s-discussion-draft__body">
            <textarea class="s-discussion-draft__body-input m-text-field m-text-field--expanded"
                      ng-model="$ctrl.body"
                      ng-change="$ctrl.bodyHasChanged()"
                      placeholder="{{ 'messages.compose.form.body.placeholder'|translate }}"
            ></textarea>
          </div>
        </div>
        <div class="s-discussion-draft__bottom-row">
          <div class="s-discussion-draft__m-action-bar m-action-bar">
            <button class="button primary m-action-bar__button">
              {{ 'messages.compose.action.send'|translate }}
            </button>
            <button class="button secondary m-action-bar__button">
              {{ 'messages.compose.action.save'|translate}}
            </button>
          </div>
        </div>
      </form>
      <div ng-if="!$ctrl.draftMessage">A 404 page has not been found (literally)</div>
    </div>`,
  /* eslint-enable max-len */
};

export default DiscussionDraftComponent;
