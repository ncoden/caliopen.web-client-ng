export class ContactItemController {
  constructor($ngRedux, TabsActions) {
    'ngInject';
    this.$ngRedux = $ngRedux;
    this.TabsActions = TabsActions;
  }
}

const ContactItemComponent = {
  bindings: {
    contact: '<',
  },
  controller: ContactItemController,
  /* eslint-disable max-len */
  template: `
    <div ui-sref="contact({ contact_id: $ctrl.contact.contact_id })"
      class="s-contact-list__contact m-block-list__item-content m-block-list__item-content--link"
    >
      <div class="s-contact-list__col-avatar">
        <avatar-letter contact="$ctrl.contact" props="{ size: 'small' }"></avatar-letter>
      </div>
      <div class="s-contact-list__col-name m-text-line">
        {{ $ctrl.contact.title }}
      </div>
      <div class="s-contact-list__col-datas">
      </div>
    </div>`,
  /* eslint-enable max-len */
};

export default ContactItemComponent;
