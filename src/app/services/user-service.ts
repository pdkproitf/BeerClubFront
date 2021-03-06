import { Router }         from '@angular/router';
import { HeadersService } from './headers-service';
import { User }           from '../models/user';
import { ServerDomain }   from '../models/server-domain';
import { Headers, Http }  from '@angular/http';
import { Injectable }     from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    LoggedIn: boolean = false;
    redirectUrl: string;
    headersService: HeadersService = new HeadersService();
    serverdomain: ServerDomain = new ServerDomain();

    constructor(private http: Http, private router: Router) {
        this.LoggedIn = !!localStorage.getItem('user');
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        let userInfo = localStorage.getItem('user');
        if (error.status === 401 && userInfo != null) {
            alert('Your token is expired');
            localStorage.removeItem('user');
            this.router.navigate(['sign-in', 'admin']);
        }
        return Promise.reject(error.message || error);
    }

    isLoggedIn(): boolean {
        this.LoggedIn = !!localStorage.getItem('user');
        return this.LoggedIn;
    }

    isAdmin(): boolean {
        if (this.LoggedIn) {
            let userInfo = localStorage.getItem('user');
            let userObj = JSON.parse(userInfo);
            return userObj.admin_mode;
        }
        return false;
    }

    signUp(user): Promise<any> {
        let requestUrl = this.serverdomain.domain + '/users';
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        var auth = this.headersService.createAuthParams();
        return this.http
        .post(requestUrl, JSON.stringify(Object.assign(user, auth)), {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }

    signIn(user): Promise<any>{
        let requestUrl = this.serverdomain.domain + '/users/sign-in';
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .post(requestUrl, JSON.stringify(user), {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }

    logOut(auth): Promise<any> {
        let requestUrl = this.serverdomain.domain + '/users/sign-out';
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .post(requestUrl, JSON.stringify(auth), {headers: headers})
        .toPromise()
        .then( res => res.json().data)
        .catch(this.handleError);
    }
}
