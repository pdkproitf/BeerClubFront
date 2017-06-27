import { Headers } from '@angular/http';
export class HeadersService {
    createAuthHeaders(headers: Headers) {
        headers.append('Content-Type', 'application/json');
        if (localStorage.getItem('UserInfo') != null) {
            let userInfo = localStorage.getItem('UserInfo');
            let userObj = JSON.parse(userInfo);
            headers.append('client', userObj.user.client);
            headers.append('access_token', userObj.user.token);
        }
    }
}
