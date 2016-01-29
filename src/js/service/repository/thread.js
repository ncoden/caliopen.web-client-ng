export class ThreadRepository {
  constructor($http, ApiUrl) {
    'ngInject';
    this.$http = $http;
    this.ApiUrl = ApiUrl;
  }

  findAll() {
    return this.$http.get(this.ApiUrl + '/threads')
      .then(response => response.data);
  }
}
