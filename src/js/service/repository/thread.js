export class ThreadRepository {
  /* @ngInject */
  constructor($http, ApiUrl) {
    this.$http = $http;
    this.ApiUrl = ApiUrl;
  }

  findAll() {
    return this.$http.get(this.ApiUrl + '/threads')
      .then(response => response.data);
  }
}
