import { Injectable } from '@angular/core';
import { EDomain, HttpService } from '@services/http.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private $http: HttpService,
  ) {
    this.$http.request(EDomain.ArticleList).get('blog').subscribe(
      _ => console.log(_)
    );
  }
}
