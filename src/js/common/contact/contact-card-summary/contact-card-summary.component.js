class ContactCardSummaryController {
  handleChanges(property, $event) {
    this.contact = { ...this.contact, [property]: $event.model };
  }

  validate() {
    this.onChange({
      $event: {
        contact: this.contact,
      },
    });
  }
}

const ContactCardSummaryComponent = {
  bindings: {
    contact: '<',
    props: '<?',
    onChange: '&',
  },
  controller: ContactCardSummaryController,
  template: `
    <contact-card-summary-container props="$ctrl.props.container">
      <edit-button>
        <button class="m-link m-link--button"
          ng-class="{ 'active': !!$ctrl.editMode }"
          ng-click="$ctrl.editMode = !$ctrl.editMode"
        >
          <i class="fa fa-edit"></i>
          <span class="show-for-sr">
            {{ 'contact_card_summary.action.edit_contact'|translate }}
          </span>
        </button>
      </edit-button>
      <contact-avatar>
        <avatar-letter contact="$ctrl.contact" props="$ctrl.props.avatar"></avatar-letter>
      </contact-avatar>
      <contact-title>{{ $ctrl.contact.title }}</contact-title>
      <contact-form>
        <form
          ng-class="$ctrl.props.stylesheets.summaryForm"
          ng-submit="$ctrl.validate()"
          ng-if="$ctrl.editMode"
        >
          <div ng-class="$ctrl.props.stylesheets.firstnameField">
            <text-field-group
              model="$ctrl.contact.given_name"
              label="'contact_card_summary.form.firstname.label'|translate"
              on-change="$ctrl.handleChanges('given_name', $event)"
            ></text-field-group>
          </div>
          <div ng-class="$ctrl.props.stylesheets.lastnameField">
            <text-field-group
              model="$ctrl.contact.family_name"
              label="'contact_card_summary.form.lastname.label'|translate"
              on-change="$ctrl.handleChanges('family_name', $event)"
            ></text-field-group>
          </div>
          <div ng-class="$ctrl.props.stylesheets.birthdayField">
            <text-field-group
              model="$ctrl.contact.birthday"
              label="'contact_card_summary.form.birthday.label'|translate"
              on-change="$ctrl.handleChanges('birthday', $event)"
            ></text-field-group>
          </div>
          <div ng-class="$ctrl.props.stylesheets.saveBtnContainer">
            <div ng-class="$ctrl.props.stylesheets.saveBtn">
              <button type="submit" class="button primary expanded">
                <span class="fa fa-check"></span>
                {{ 'contact_card_summary.action.save'|translate}}
              </button>
            </div>
          </div>
        </form>
      </contact-form>
    </contact-card-summary-container>
  `,
};


export default ContactCardSummaryComponent;
