const TAB_ROUTES_CONFIG = {
  thread: { route: 'thread', itemAssoc: { threadId: 'thread_id' } },
  'draft-message': { route: 'discussion-draft', itemAssoc: { messageId: 'message_id' } },
  contact: { route: 'contact', itemAssoc: { contactId: 'contact_id' } },
};

export class TabHelper {
  getRouteAndParamsForTab(tab) {
    const { route, itemAssoc } = TAB_ROUTES_CONFIG[tab.type];
    const params = Object.keys(itemAssoc).reduce((previous, routeKeyParam) => {
      const itemKey = itemAssoc[routeKeyParam];

      return Object.assign(previous, { [routeKeyParam]: tab.item[itemKey] });
    }, {});

    return { route, params };
  }
}
