export const ApplicationRoutes = {
  discussions: 'front.discussions',
  contacts: 'front.contacts',
};

export class ApplicationHelper {
  constructor($state) {
    'ngInject';
    this.$state = $state;
  }

  getCurrentInfos() {
    const name = Object.keys(ApplicationRoutes)
      .find(currentName => this.$state.includes(ApplicationRoutes[currentName]));

    return ({
      name,
      route: ApplicationRoutes[name],
    });
  }
}
