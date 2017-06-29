import { Router } from '@angular/router';
import { HeadersService } from './headers-service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ServerDomain }   from '../models/server-domain';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryService {
  serverdomain: ServerDomain = new ServerDomain();
  headersService: HeadersService = new HeadersService();
  constructor(private http: Http, private router: Router) {
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    let userInfo = localStorage.getItem('UserInfo');
    if (error.status === 401 && userInfo != null) {
      alert('Your token is expired');
      localStorage.removeItem('UserInfo');
      this.router.navigate(['sign-in']);
    }
    return Promise.reject(error.message || error);
  }

  getCategories(): Promise<any> {
    let requestUrl = new ServerDomain().domain + '/categories';
    return this.http
    .get(requestUrl)
    .toPromise()
    .then(res => res.json())
    .catch(error => this.handleError(error));
  }

  createCategory(categoryPost: Object): Promise<any> {
    let requestUrl = this.serverdomain.domain + '/categories';
    let headers = new Headers();
    this.headersService.createAuthHeaders(headers);
    return this.http
    .post(requestUrl, JSON.stringify(categoryPost), {headers: headers})
    .toPromise()
    .then(res => {
      return res.json().data;
    })
    .catch(error => {
      return this.handleError(error);
    });
  }
}
