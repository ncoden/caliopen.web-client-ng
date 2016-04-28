const ASSOC_DETAIL_TYPE_PATH = {
  email: 'emails',
  address: 'addresses',
  im: 'ims',
};

const contactColl = {
  total: 4,
  contacts: [{
    family_name: 'bender',
    tags: null,
    given_name: null,
    contact_id: '92d3727a-eefc-4537-b879-85f1c9d197bb',
    title: 'bender',
    privacy_index: 80,
    emails: [{
      address: 'bender@planet-express.fake',
      date_insert: '2016-05-25T14:13:05.591000',
      date_update: null,
      is_primary: 0,
      label: null,
      type: 'home',
    }],
    phones: [{
      type: 'home',
      number: '+01100110011',
    }],
    social_identities: [{
      type: 'facebook',
      name: 'Bite.my.shiny.metal.ass',
    }, {
      type: 'twitter',
      name: '@BiteMyShinyMetalAss',
    }],
  }, {
    family_name: 'zoidberg',
    tags: null,
    given_name: null,
    contact_id: '0ba2e346-e4f8-4c45-9adc-eeb1d42f07e0',
    title: 'zoidberg',
    privacy_index: 10,
    emails: [{
      address: 'zoidberg@planet-express.fake',
      date_insert: '2016-05-25T14:13:05.591000',
      date_update: null,
      is_primary: 0,
      label: null,
      type: 'home',
    }],
    social_identities: [{
      type: 'facebook',
      name: 'DrZoidberg',
    }],
  }, {
    family_name: 'Doe',
    tags: null,
    given_name: 'John',
    contact_id: '19c3ce42-e3ba-46e7-984f-4c3e8de11c05',
    title: 'John Doe',
    privacy_index: 45,
    emails: [{
      address: 'john@caliopen.local',
      date_insert: '2016-05-25T14:13:05.591000',
      date_update: null,
      is_primary: 0,
      label: null,
      type: 'home',
    }],
  }, {
    family_name: 'test',
    tags: null,
    given_name: null,
    contact_id: '1039cdcc-1f6f-4b5d-9c8a-5d7c711f357f',
    title: 'test',
    privacy_index: 99,
    emails: [{
      address: 'test@caliopen.local',
      date_insert: '2016-05-25T14:13:05.591000',
      date_update: null,
      is_primary: 0,
      label: null,
      type: 'home',
    }],
  }],
};

const getProtocolResponses = (contactId) => {
  const contact = contactColl.contacts
    .find((currentContact) => currentContact.contact_id === contactId);

  if (!contact) {
    return { total: 0, protocols: [] };
  }

  const protocols = [];

  if (!!contact.emails) {
    contact.emails.forEach(email => {
      protocols.push({
        type: 'email',
        identifier: email.address,
        privacy_index: contact.privacy_index + 5,
      });
    });
  }

  if (!!contact.phones) {
    contact.phones.forEach(phone => {
      protocols.push({
        type: 'sms',
        identifier: phone.number,
        privacy_index: contact.privacy_index + 9,
      });
    });
  }

  if (!!contact.social_identities) {
    contact.social_identities
      .filter((si) => ['facebook'].indexOf(si.type) !== -1)
      .forEach((si, index) => {
        protocols.push({
          type: si.type,
          identifier: si.name,
          privacy_index: contact.privacy_index - 15 - index,
        });
      });
  }

  return {
    total: protocols.length,
    protocols: protocols.sort((a, b) => b.privacy_index - a.privacy_index),
  };
};

export class ContactRepository {
  constructor($http, $q, ApiUrl) {
    'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.ApiUrl = ApiUrl;
  }

  findAll(offset = 0, limit = 1000, source = 'api') {
    if (source === 'mock') {
      return this.$q.when(contactColl);
    }

    return this.$http.get(`${this.ApiUrl}/contacts`, { params: { offset, limit } })
      .then(response => response.data);
  }

  findByContactId(contactId) {
    return this.$http.get(`${this.ApiUrl}/contacts/${contactId}`)
      .then(response => response.data);
  }

  addContactDetail(contactId, contactDetailType, contactDetail) {
    const typePath = ASSOC_DETAIL_TYPE_PATH[contactDetailType];
    const url = `${this.ApiUrl}/contacts/${contactId}/${typePath}`;

    return this.$http
      .post(url, contactDetail, { responseType: 'json' })
      .then(response => response.data)
      .catch(response => this.$q.reject(response.data));
  }

  deleteContactDetail(type, contactId, contactDetail) {
    const typePath = ASSOC_DETAIL_TYPE_PATH[type];
    const address = contactDetail.address;
    const url = `${this.ApiUrl}/contacts/${contactId}/${typePath}/${address}`;

    return this.$http
      .delete(url, { responseType: 'json' })
      .then(response => response.data);
  }

  findProtocolsByContactId(contactId, source = 'api') {
    if (source === 'mock') {
      return this.$q.when(getProtocolResponses(contactId));
    }

    return this.$http.get(`${this.ApiUrl}/contacts/${contactId}/protocols`)
      .then(response => response.data);
  }
}
