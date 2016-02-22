export const APPLICATION_DISCUSSIONS = 'discussions';
export const APPLICATION_CONTACTS = 'contacts';

export class ApplicationHelper {
  constructor($state) {
    'ngInject';
    this.$state = $state;
  }

  getInfoForCurrentState() {
    let name, route;
    switch(true) {
      case (this.$state.includes('front.discussions')):
        name = APPLICATION_DISCUSSIONS;
        route = 'front.discussions';
        break;
      case (this.$state.includes('front.contacts')):
        name = APPLICATION_CONTACTS;
        route = 'front.contacts';
        break;
    }

    return {
      name,
      route
    };
  }
}
