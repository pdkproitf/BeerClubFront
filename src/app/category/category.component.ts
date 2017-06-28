import { Component, OnInit }  from '@angular/core';
import { CategoryService }    from '../services/category-service';
import { Category }           from '../models/category';
import { Message }            from 'primeng/primeng';
import { Beer }           from '../models/beer';
import { User }           from '../models/user';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  dialogVisible: boolean = false;
  user: User;
  msgs: Message[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().then(
      res => {
        this.categories = res['data'];
        console.log('categories', this.categories)
      },
      error => {
        console.log('error', error);
      }
    )
  }

  getUser(){
    let userInfo = localStorage.getItem('UserInfo');
    let userObj = JSON.parse(userInfo);
    this.user = userObj;
  }

  showDialog(show: boolean){
    this.dialogVisible = show;
  }

  createCategory(name: string){
    let category = {
      category:{
        name: name
      }
    }
    this.categoryService.createCategory(category).then(
      (result) => {
        this.categories.push(result);
        this.noticeMessage('Success!', 0);
      },
      (error) => {
        this.noticeMessage(JSON.parse(error['_body']).error);
      }
    )
  }

  noticeMessage(content: string, status: number = 1){
    this.msgs = [];
    switch(status){
      case 0:{
        this.msgs.push({severity: 'success', summary: 'Success Message', detail: content});
        break;
      };
      case 1:{
        this.msgs.push({severity: 'error', summary: 'Error Messages', detail: content});
      }
    }
  }
}
