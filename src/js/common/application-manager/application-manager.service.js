export const ApplicationRoutes = {
  discussions: 'discussions',
  contacts: 'contact-list',
};

const APPLICATION_ICONS = {
  discussions: 'fa-comments',
  contacts: 'fa-users',
};

class ApplicationManagerService {
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

export default ApplicationManagerService;
