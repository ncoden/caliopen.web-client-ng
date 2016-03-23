export class UserRepository {
  constructor($http, ApiUrl) {
    'ngInject';
    this.$http = $http;
    this.ApiUrl = ApiUrl;
  }

  getUser() {
    return this.$http.get(`${this.ApiUrl}/me`)
      .then(response => response.data);
  }
}
