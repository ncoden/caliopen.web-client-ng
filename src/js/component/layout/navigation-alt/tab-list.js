import { TabListController } from '../../module/tab-list.js';

export const LayoutNavigationAltTabListComponent = {
  controller: TabListController,
  /* eslint-disable max-len */
  template: `
    <ul class="m-menu">
      <li ng-repeat="tab in $ctrl.tabs"
        class="m-menu__item m-menu--vertical__item"
        ui-sref-active-eq="is-active"
      >
        <span ng-switch="tab.type">
          <a ng-switch-when="thread"
            ui-sref="front.discussions.thread({ threadId: tab.item.thread_id })"
            title="{{$ctrl.getThread(tab.item.thread_id)|threadContacts:$ctrl.user}}"
            class="m-tab__link"
          >
            <i class="fa fa-comments-o"></i>
            {{$ctrl.getThread(tab.item.thread_id)|threadContacts:$ctrl.user|limitTo:200}}
          </a>

          <a ng-switch-when="contact"
            ui-sref="front.contacts.contact({ contactId: tab.item.contact_id })"
            title="{{$ctrl.getContact(tab.item.contact_id).title}}"
            class="m-tab__link"
          >
            <i class="fa fa-user"></i>
            {{$ctrl.getContact(tab.item.contact_id).title|limitTo:200}}
          </a>
          <a ng-switch-when="draft-message"
            ui-sref="front.discussions.draft({ messageId: tab.item.message_id })"
            class="m-tab__link"
          >
            <i class="fa fa-envelope-o"></i>
            {{'messages.compose.title'|translate}}
          </a>
        </span>

        <a href ng-click="$ctrl.remove(tab)" class="m-tab__button">
          <i class="fa fa-close"></i>
        </a>
      </li>
    </ul>`,
  /* eslint-enable max-len */
};
