export class MessageRepository {
  constructor($http, ApiUrl) {
    'ngInject';
    this.$http = $http;
    this.ApiUrl = ApiUrl;
  }

  findByThreadId(threadId) {
    return this.$http.get(`${this.ApiUrl}/threads/${threadId}/messages`)
      .then(response => response.data);
  }
}
