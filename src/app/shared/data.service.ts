import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getPagesCount(){
    return this.http.get('/data/count').toPromise();
  }

  getNewsPage(number, filter?){
    return this.http.post(`/data/page`, {filter: filter, number: number}).toPromise();
  }

  getNews(number){
    return this.http.get(`/data/post/${number}`).toPromise();
  }

  createPost(post){
    return this.http.post('/data/post', {post:post}).toPromise();
  }
}
