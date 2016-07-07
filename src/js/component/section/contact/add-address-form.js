import { createSelector } from 'reselect';

const ADDRESS_TYPES = ['work', 'home', 'other'];

const addressFormSelector = createSelector(
  state => state.contactReducer.contactDetailFormsById,
  state => state.router.currentParams.contactId,
  (contactDetailState, contactId) => {
    if (!!contactDetailState[contactId] && contactDetailState[contactId].addressForm) {
      return contactDetailState[contactId].addressForm;
    }

    return {};
  }
);

export class AddContactDetailFormController {
  constructor($scope, $ngRedux, ContactsActions) {
    'ngInject';
    this.$ngRedux = $ngRedux;
    this.ContactsActions = ContactsActions;

    $scope.$on('$destroy', $ngRedux.connect(addressFormSelector)(this));

    this.contactDetailTypes = ADDRESS_TYPES;
    this.loading = false;
    this.errors = [];
    this.contactDetail = { };
  }

  addContactDetail() {
    this.$ngRedux.dispatch(
      this.ContactsActions.addContactDetail(this.contact.contact_id, 'address', this.contactDetail)
    );
  }
}

export const AddAddressFormComponent = {
  bindings: {
    contact: '<',
  },
  controller: AddContactDetailFormController,
  /* eslint-disable max-len */
  template: `
    <form ng-submit="$ctrl.addContactDetail()"
      class="s-contact-detail-form" name="address_form">
      <fieldset class="m-fieldset">
        <legend class="m-fieldset__legend">
          <span class="m-text-list__icon fa fa-map-marker"></span>
          {{ 'contact.address_form.legend'|translate}}
        </legend>
        <div class="s-contact-detail-form__row">
          <div ng-if="$ctrl.errors.length > 0" class="callout alert s-contact-detail-form__group">
            <p ng-repeat="error in $ctrl.errors">{{ error.description }}</p>
          </div>
          <div class="s-contact-detail-form__group s-contact-detail-form__group--medium">
            <label for="address_form_street" class="_sr-only">{{ 'contact.address_form.street.label'|translate }}</label>
            <input ng-model="$ctrl.contactDetail.street" type="text" class="m-text-field m-text-field--dark m-text-field--expanded m-text-field--bottom-space" id="address_form_street" />
          </div>
          <div class="s-contact-detail-form__group s-contact-detail-form__group--shrink">
            <label for="address_form_postal_code" class="_sr-only">{{ 'contact.address_form.postal_code.label'|translate }}</label>
            <input ng-model="$ctrl.contactDetail.postal_code" type="text" class="m-text-field m-text-field--dark m-text-field--expanded m-text-field--bottom-space" id="address_form_postal_code" />
          </div>
          <div class="s-contact-detail-form__group s-contact-detail-form__group--medium">
            <label for="address_form_city" class="_sr-only">{{ 'contact.address_form.city.label'|translate }}</label>
            <input ng-model="$ctrl.contactDetail.city" type="text" class="m-text-field m-text-field--dark m-text-field--expanded m-text-field--bottom-space" id="address_form_city" />
          </div>
          <div class="s-contact-detail-form__group s-contact-detail-form__group--medium">
            <label for="address_form_country" class="_sr-only">{{ 'contact.address_form.country.label'|translate }}</label>
            <input ng-model="$ctrl.contactDetail.country" type="text" class="m-text-field m-text-field--dark m-text-field--expanded m-text-field--bottom-space" id="address_form_country" />
          </div>
          <div class="s-contact-detail-form__group s-contact-detail-form__group--medium">
            <label for="address_form_region" class="_sr-only">{{ 'contact.address_form.region.label'|translate }}</label>
            <input ng-model="$ctrl.contactDetail.region" type="text" class="m-text-field m-text-field--dark m-text-field--expanded m-text-field--bottom-space" id="address_form_region" />
          </div>
          <div class="s-contact-detail-form__group s-contact-detail-form__group--shrink">
            <label for="address_form_type" class="_sr-only">{{ 'contact.address_form.type.label'|translate }}</label>
            <select ng-model="$ctrl.contactDetail.type"
              ng-options="('contact.address_type.' + contactDetailType)|translate for contactDetailType in $ctrl.contactDetailTypes"
              required="required"
              class="m-text-field m-text-field--dark" id="address_form_type">
            </select>
          </div>
        </div>
        <div class="s-contact-detail-form__row">
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
