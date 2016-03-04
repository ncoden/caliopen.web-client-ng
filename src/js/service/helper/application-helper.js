export const ApplicationRoutes = {
  discussions: 'front.discussions',
  contacts: 'front.contacts'
};

export class ApplicationHelper {
  constructor($state) {
    'ngInject';
    this.$state = $state;
  }

  getCurrentInfos() {
    let name = Object.keys(ApplicationRoutes).find(
      name => this.$state.includes( ApplicationRoutes[name] )
    );
    return ({
      name,
      route: ApplicationRoutes[name]
    });
  }
}
