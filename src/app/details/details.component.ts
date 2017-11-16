import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../shared/data.service";
import {News} from "../models/news";
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  news: News;

  constructor(private data: DataService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe(
      async (params) => {
        this.news = undefined;
        this.news = (await this.data.getNews(params.id)).json();
        console.log(this.news)
      });
  }

  goBack(){
    const route = JSON.parse(window.localStorage.getItem('currentPage'));
    const queryParams = {'page': route.page};
    queryParams['filter'] = route['filter']? route['filter'] : null;
    if(route){
      this.router.navigate(['./news'], {relativeTo: this.route.parent, queryParams: queryParams});
    }
    else{
      this.router.navigate(['./news'], {relativeTo: this.route.parent, queryParams: {'page': 1}});
    }
    window.localStorage.removeItem('currentPage');
  }


}
