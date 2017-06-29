import { Category, CategoryPost }     from '../models/category';
import { Component, OnInit }  from '@angular/core';
import { CategoryService }    from '../services/category-service';
import { Message }            from 'primeng/primeng';
import { Router }         from '@angular/router';
import { Beer }           from '../models/beer';
import { User }           from '../models/user';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  _categories: Category[] = [];
  dialogVisible: boolean = false;
  user: User;
  msgs: Message[] = [];
  searchCategoryParten: string = '';
  category: Category;

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.categoryService.getCategories().then(
      res => {
        this.categories = res['data'];
        this._categories = this.categories;
        console.log('categories', this.categories)
      },
      error => {
        console.log('error', error);
      }
    )
    this.getUser();
  }

  getUser(){
    let userInfo = localStorage.getItem('user');
    let userObj = JSON.parse(userInfo);
    this.user = userObj;
  }

  showDialog(show: boolean){
    this.dialogVisible = show;
  }

  showBeer(id: number){
    this.router.navigate(['beer', id])
  }

  createCategory(name: string){
    this.categoryService.createCategory(this.getCategoryPost(name)).then(
      (result) => {
        this.categories.push(result);
        this.noticeMessage('Success!', 0);
        this.showDialog(false);
      },
      (error) => {
        this.noticeMessage(JSON.parse(error['_body']).error);
      }
    )
  }

  searchCategory(){
    this._categories = [];
    for (let category of this.categories) {
      if ((category.name.toUpperCase().indexOf(this.searchCategoryParten.toUpperCase()) > -1) ||
      (category.name.toLowerCase() .indexOf(this.searchCategoryParten.toLowerCase()) > -1)) {
        this._categories.push(category);
      }
    }
  }

  save(id: number, name: string){
    this.categoryService.updateCategory(id, this.getCategoryPost(name)).then(
      (result) => {
        this.categories.push(result);
        this.noticeMessage('Success!', 0);
      },
      (error) => {
        this.noticeMessage(JSON.parse(error['_body']).error);
      }
    )
  }

  getCategoryPost(name: string){
    var category = new Category();
    category.name = name;
    var categoryPost = new CategoryPost();
    categoryPost.category = category;
    return categoryPost;
  }

  delete(id: number){

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
