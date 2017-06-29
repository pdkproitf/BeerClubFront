import { Router } from '@angular/router';
import { HeadersService } from './headers-service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ServerDomain }   from '../models/server-domain';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BeerService {
  serverdomain: ServerDomain = new ServerDomain();
  headersService: HeadersService = new HeadersService();
  constructor(private http: Http, private router: Router) {
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    let userInfo = localStorage.getItem('user');
    if (error.status === 401 && userInfo != null) {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in', 'admin']);
    }
    return Promise.reject(error.message || error);
  }

  getBeer(id: number): Promise<any> {
    let requestUrl = new ServerDomain().domain + '/beers/' + id;
    let headers = new Headers();
    this.headersService.createAuthHeaders(headers);
    return this.http
    .get(requestUrl, {headers: headers})
    .toPromise()
    .then(res => res.json())
    .catch(error => this.handleError(error));
  }

  archiveBeer(id: number){
    let requestUrl = this.serverdomain.domain + '/beers/' + id + '/archive';
    let headers = new Headers();
    this.headersService.createAuthHeaders(headers);
    return this.http
    .put(requestUrl, {}, {headers: headers})
    .toPromise()
    .then(res => {
      return res.json().data;
    })
    .catch(error => {
      return this.handleError(error);
    });
  }

  unarchiveBeer(id: number){
    let requestUrl = this.serverdomain.domain + '/beers/' + id + '/unarchive';
    let headers = new Headers();
    this.headersService.createAuthHeaders(headers);
    return this.http
    .put(requestUrl, {}, {headers: headers})
    .toPromise()
    .then(res => {
      return res.json().data;
    })
    .catch(error => {
      return this.handleError(error);
    });
  }
}
