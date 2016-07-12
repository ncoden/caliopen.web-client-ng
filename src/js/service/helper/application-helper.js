export const ApplicationRoutes = {
  discussions: 'front.discussions',
  contacts: 'front.contacts',
};

const APPLICATION_ICONS = {
  discussions: 'fa-comments',
  contacts: 'fa-users',
};

export class ApplicationHelper {
  getInfos(name) {
    return ({
      name,
      route: ApplicationRoutes[name],
      icon: APPLICATION_ICONS[name],
    });
  }

  getInfosFromRoute(route) {
    const applicationName = Object.keys(ApplicationRoutes)
      .find((name) => ApplicationRoutes[name] === route);

    if (!!applicationName) {
      return this.getInfos(applicationName);
    }

    return undefined;
  }

  getApplications() {
    return Object.keys(ApplicationRoutes).map((applicationName) => this.getInfos(applicationName));
  }
}
