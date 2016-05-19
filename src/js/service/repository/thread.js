export class ThreadRepository {
  constructor($http, ApiUrl) {
    'ngInject';
    this.$http = $http;
    this.ApiUrl = ApiUrl;
  }

  findAll(offset = 0, limit = 20) {
    return this.$http.get(`${this.ApiUrl}/threads`, { params: { offset, limit } })
      .then(response => response.data);
  }

  find(threadId) {
    return this.$http.get(`${this.ApiUrl}/threads/${threadId}`)
      .then(response => response.data);
  }
}
