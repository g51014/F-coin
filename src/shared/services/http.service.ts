import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

export interface HttpOptions {
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;
}

export enum EDomain {
  ArticleList = 'articleList',
  TagList = 'tagList'
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) { }


  public request(type: EDomain) {
    const DOMAIN = environment[type];
    return {
      get: (url: string, options: HttpOptions = {}) => this.get(url, options, DOMAIN),
      post: (url: string, params = {}, options: HttpOptions = {}) => this.post(url, params, options, DOMAIN),
      create: (url: string, formData: FormData, options: HttpOptions = {}) => this.create(url, DOMAIN, formData, options)
    };
  }

  private create(url: string, domain: string, formData: FormData, options = {}) {
    return this.http.request(
      new HttpRequest(
        'POST',
        `${domain}/${url}`,
        formData,
        { ...options, ... { headers: this.getHeader() } }
      )
    );
  }

  private get(url: string, options, domain) {
    return this.http.get(`${domain}/${url}`, { ...options, ... { headers: this.getHeader() } }).pipe(
      catchError(
        error => {
          console.log(error)
          throw error;
        }
      )
    );
  }

  private post(url: string, params, options, domain) {
    return this.http.post(`${domain}/${url}`, params, { ...options, ... { headers: this.getHeader() } }).pipe(
      catchError(
        error => {
          console.log('http request fail', error);
          return of([]);
        }
      )
    );
  }

  private getHeader() {
    return new HttpHeaders().set(
      `Authorization`,
      `Bearer ${sessionStorage.getItem('access_token')}`
    );
  }
}
