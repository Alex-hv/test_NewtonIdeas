import { Component, OnInit } from '@angular/core';
import {DataService} from "../shared/data.service";
import {News} from "../models/news";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  newsList: News[] = [];
  pagesCount: Array<number> = [];
  filters: FormGroup = new FormGroup({
    type: new FormControl(''),
  });
  currentPage: number = 1;

  constructor(private data: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {

        if(params['filter'] && this.filters.value.type !== params['filter']){
          this.filters.setValue({type: params['filter']});
        }

      if(params['page'] && this.currentPage !== params['filter']){
        this.currentPage = params['page'];
      }

        if(!params['page']){
          this.navigate();
        }else{
          (async() => {
            this.newsList = (await this.data.getNewsPage(params['page'], params['filter'])).json();
            this.pagesCount = [];
            for(let i = 1; i <= (await this.data.getPagesCount()).json(); i++){
              this.pagesCount.push(i);
            }
          })();
        }
      });

    this.filters.valueChanges.subscribe(_ => {
      this.currentPage = 1;
      this.navigate();
    });

  }

  changePage(pageNumber){
    this.currentPage = pageNumber;
    this.navigate();
  }

  navigate(){
    window.scrollTo(0, 0);
    const queryParams = {'page': this.currentPage};
    if(this.filters.value.type) queryParams['filter'] =  this.filters.value.type;
    this.router.navigate(['./news'], {relativeTo: this.route.parent, queryParams: queryParams});
  }

  openDetails(id){
    window.localStorage.setItem('currentPage', JSON.stringify({page: this.currentPage, filter: this.filters.value.type}));
    this.router.navigate(['./details', id], {relativeTo: this.route.parent});
  }

  addPost(){
    this.router.navigate(['./add'], {relativeTo: this.route.parent});
  }

  resetFilters(){
    this.filters.reset()
  }

}
