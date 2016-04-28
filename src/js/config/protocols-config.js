export const protocolsConfig = {
  unknown: {
    iconClass: 'fa-question-circle',
    default: true,
  },
  sms: {
    iconClass: 'fa-mobile',
  },
  email: {
    iconClass: 'fa-envelope',
    regexp: /^\w+@\w+(\.\w+)?$/,
  },
  facebook: {
    iconClass: 'fa-facebook',
  },
};
