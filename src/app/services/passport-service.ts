import { Router } from '@angular/router';
import { HeadersService } from './headers-service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ServerDomain }   from '../models/server-domain';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PassportService {
  serverdomain: ServerDomain = new ServerDomain();
  headersService: HeadersService = new HeadersService();
  constructor(private http: Http, private router: Router) {
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

  getPassports(): Promise<any> {
    let requestUrl = new ServerDomain().domain + '/passports';
    let headers = new Headers();
    this.headersService.createAuthHeaders(headers);
    return this.http
      .get(requestUrl, {headers: headers})
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
      .then(res => { return res.json().data;})
      .catch(error => { return this.handleError(error);});
  }

  updateCategory(id: number, categoryPost: Object): Promise<any> {
    let requestUrl = this.serverdomain.domain + '/categories/' + id;
    let headers = new Headers();
    this.headersService.createAuthHeaders(headers);
    return this.http
      .put(requestUrl, JSON.stringify(categoryPost), {headers: headers})
      .toPromise()
      .then(res => { return res.json().data;})
      .catch(error => { return this.handleError(error);});
  }

  deleteCategory(id: number): Promise<any> {
    let requestUrl = this.serverdomain.domain + '/categories/' + id;
    let headers = new Headers();
    this.headersService.createAuthHeaders(headers);
    return this.http
      .delete(requestUrl, {headers: headers})
      .toPromise()
      .then(res => { return res.json().data;})
      .catch(error => { return this.handleError(error);});
  }
}
