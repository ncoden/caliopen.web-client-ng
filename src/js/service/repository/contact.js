export class ContactRepository {
  /* @ngInject */
  constructor($http, ApiUrl) {
    this.$http = $http;
    this.ApiUrl = ApiUrl;
  }

  findAll() {
    return this.$http.get(this.ApiUrl + '/contacts')
      .then(response => response.data);
  }
}
