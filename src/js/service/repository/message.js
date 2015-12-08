export class MessageRepository {
  /* @ngInject */
  constructor($http, ApiUrl) {
    this.$http = $http;
    this.ApiUrl = ApiUrl;
  }

  findByThreadId(threadId) {
    return this.$http.get(`${this.ApiUrl}/threads/${threadId}`)
      .then(response => response.data);
  }
}
