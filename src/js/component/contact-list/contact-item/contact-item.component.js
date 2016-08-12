import { stateGo } from 'redux-ui-router';

export class ContactItemController {
  constructor($ngRedux, TabsActions) {
    'ngInject';
    this.$ngRedux = $ngRedux;
    this.TabsActions = TabsActions;
  }

  showContact() {
    this.$ngRedux.dispatch(dispatch => {
      dispatch(this.TabsActions.selectOrAdd({
        type: 'contact',
        item: {
          contact_id: this.contact.contact_id,
        },
      }));
      dispatch(stateGo('contact', { contactId: this.contact.contact_id }));
    });
  }
}

const ContactItemComponent = {
  bindings: {
    contact: '<',
  },
  controller: ContactItemController,
  /* eslint-disable max-len */
  template: `
    <div ng-click="$ctrl.showContact()" class="s-contact-list__contact m-block-list__item-content m-block-list__item-content--link">
      <div class="s-contact-list__col-avatar">
        <avatar-letter contact="$ctrl.contact"></avatar-letter>
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
