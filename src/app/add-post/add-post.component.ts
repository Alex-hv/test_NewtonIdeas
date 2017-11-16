import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../shared/data.service";


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  postForm: FormGroup;

  constructor(private data: DataService, private location: Location, private fb: FormBuilder) {
    this.postForm = fb.group({
      'title': ['', Validators.required],
      'description': ['', Validators.required],
      'category': ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  async addPost(){
    if(this.postForm.valid){
      await this.data.createPost(this.postForm.value);
      this.goBack();
    }
  }

  goBack(){
    this.location.back();
  }
}
