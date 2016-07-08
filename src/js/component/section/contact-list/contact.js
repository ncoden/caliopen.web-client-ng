import { stateGo } from 'redux-ui-router';

export class ContactListContactController {
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
      dispatch(stateGo('front.contacts.contact', { contactId: this.contact.contact_id }));
    });
  }
}

export const ContactListContactComponent = {
  bindings: {
    contact: '<',
  },
  controller: ContactListContactController,
  /* eslint-disable max-len */
  template: `
    <div ng-click="$ctrl.showContact()" class="s-contact-list__contact m-block-list__item-content m-block-list__item-content--link">
      <div class="s-contact-list__col-avatar">
        <co-avatar-letter contact="$ctrl.contact"></co-avatar-letter>
      </div>
      <div class="s-contact-list__col-name m-text-line">
        {{ $ctrl.contact.title }}
      </div>
      <div class="s-contact-list__col-datas">
      </div>
    </div>`,
  /* eslint-enable max-len */
};
