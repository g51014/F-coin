import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../news.service';

@Component({
  selector: 'app-news-center',
  templateUrl: './news-center.component.html',
  styleUrls: ['./news-center.component.scss']
})
export class NewsCenterComponent implements OnInit {

  constructor(
    private $news: NewsService
  ) { }

  ngOnInit(): void {

  }

}
