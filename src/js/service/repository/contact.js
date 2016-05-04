const ASSOC_DETAIL_TYPE_PATH = {
  email: 'emails',
  address: 'addresses',
  im: 'ims',
};
export class ContactRepository {
  constructor($http, $q, ApiUrl) {
    'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.ApiUrl = ApiUrl;
  }

  findAll() {
    return this.$http.get(`${this.ApiUrl}/contacts`)
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
}
