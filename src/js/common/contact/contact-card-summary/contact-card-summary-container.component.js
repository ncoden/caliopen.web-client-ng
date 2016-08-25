const ContactCardSummaryContainerComponent = {
  bindings: {
    props: '<',
  },
  transclude: {
    'edit-button': 'editButton',
    avatar: 'contactAvatar',
    title: 'contactTitle',
    form: 'contactForm',
  },
  template: `
    <div class="m-contact-main" ng-class="$ctrl.props.stylesheets.block">
      <div class="m-contact-main__edit-button"
        ng-class="$ctrl.props.stylesheets.editButton"
        ng-transclude="edit-button"
      ></div>
      <div class="m-contact-main__avatar"
        ng-class="$ctrl.props.stylesheets.avatar"
        ng-transclude="avatar"
      ></div>
      <h3 class="m-contact-main__title"
        ng-class="$ctrl.props.stylesheets.title"
        ng-transclude="title"
      ></h3>
      <div class="m-contact-main__contact-form"
        ng-class="$ctrl.props.stylesheets.contactForm"
        ng-transclude="form"
      ></div>
    </div>
  `,
};


export default ContactCardSummaryContainerComponent;
