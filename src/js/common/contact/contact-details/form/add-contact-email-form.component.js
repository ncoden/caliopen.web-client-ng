import { createSelector } from 'reselect';

const EMAIL_TYPES = ['work', 'home', 'other'];

const emailFormSelector = createSelector(
  state => state.contactReducer.contactDetailFormsById,
  state => state.router.currentParams.contact_id,
  (contactDetailState, contactId) => {
    if (!!contactDetailState[contactId] && contactDetailState[contactId].emailForm) {
      return contactDetailState[contactId].emailForm;
    }

    return {};
  }
);

export class AddContactDetailFormController {
  constructor($scope, $ngRedux, ContactsActions) {
    'ngInject';
    this.$ngRedux = $ngRedux;
    this.ContactsActions = ContactsActions;

    $scope.$on('$destroy', $ngRedux.connect(emailFormSelector)(this));

    this.loading = false;
    this.errors = [];
    this.emailTypes = EMAIL_TYPES;
    this.contactDetail = {};
  }

  addContactDetail() {
    this.$ngRedux.dispatch(
      this.ContactsActions.addContactDetail(this.contact.contact_id, 'email', this.contactDetail)
    );
    this.onAdd({ $event: { type: 'email', contactDetail: this.contactDetail } });
  }
}

const AddContactEmailFormComponent = {
  bindings: {
    contact: '<',
    onAdd: '&',
  },
  controller: AddContactDetailFormController,
  /* eslint-disable max-len */
  template: `
    <form ng-submit="$ctrl.addContactDetail()"
      class="s-contact-detail-form" name="email_form">
      <fieldset class="m-fieldset">
        <legend class="m-fieldset__legend">
          <span class="m-text-list__icon fa fa-envelope"></span>
          {{ 'contact.email_form.legend'|translate}}
        </legend>
        <div class="s-contact-detail-form__row">
          <div ng-if="$ctrl.errors.length > 0" class="callout alert s-contact-detail-form__group">
            <p ng-repeat="error in $ctrl.errors">{{ error.description }}</p>
          </div>
          <div class="s-contact-detail-form__group s-contact-detail-form__group--medium">
            <label class="show-for-sr" for="email_form_address">
              {{ 'contact.email_form.address.label'|translate }}
            </label>
            <input ng-model="$ctrl.contactDetail.address"
              type="email"
              class="m-text-field m-text-field--dark m-text-field--expanded"
              id="email_form_address" required />
          </div>
          <div class="s-contact-detail-form__group s-contact-detail-form__group--shrink">
            <label class="show-for-sr" for="email_form_type">
              {{ 'contact.email_form.email_type.label'|translate }}
            </label>
            <select ng-model="$ctrl.contactDetail.type"
              ng-options="('contact.email_type.' + emailType)|translate for emailType in $ctrl.emailTypes"
              required="required"
              class="m-text-field m-text-field--dark" id="email_form_type">
            </select>
          </div>
          <label class="s-contact-detail-form__group s-contact-detail-form__checkbox-label s-contact-detail-form__group--shrink">
            <input type="checkbox" ng-model="$ctrl.contactDetail.is_primary"
              ng-true-value="1" ng-false-value="0"/>
            {{'contact.email_form.is_primary.label'|translate}}
          </label>
          <div class="s-contact-detail-form__button">
            <button type="submit" class="button primary expanded">
              <span class="fa fa-plus"></span>
              {{ 'contact.action.add_contact_detail'|translate}}
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  `,
  /* eslint-enable max-len */
};

export default AddContactEmailFormComponent;
