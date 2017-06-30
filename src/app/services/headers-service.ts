import { Headers } from '@angular/http';
export class HeadersService {
  createAuthHeaders(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    if (localStorage.getItem('user') != null) {
      let userInfo = localStorage.getItem('user');
      let userObj = JSON.parse(userInfo);
      headers.append('client', userObj.client);
      headers.append('access_token', userObj.token);
    }
  }
}
