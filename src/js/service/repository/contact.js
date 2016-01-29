export class ContactRepository {
  constructor($http, ApiUrl) {
    'ngInject';
    this.$http = $http;
    this.ApiUrl = ApiUrl;
  }

  findAll() {
    return this.$http.get(this.ApiUrl + '/contacts')
      .then(response => response.data);
  }
}