import {createSelector} from 'reselect';

const contactSelector = createSelector(
  state => state.contactReducer,
  payload => {
    return {
      contact: payload.selectedContact
    };
  });

class ContactController {
  constructor($state) {
    'ngInject';
    $scope.$on('$destroy', $ngRedux.connect(contactSelector)(this));
  }
}

export function ContactDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller: ContactController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <h2>{{ctrl.contact.fullname}}</h2>`
  };
}
