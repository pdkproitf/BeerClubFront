import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { Beer, BeerPost }           from '../models/beer';
import { CategoryService }          from '../services/category-service';
import { BeerService }              from '../services/beer-service';
import { Message }                  from 'primeng/primeng';
import { Category }                 from '../models/category';
import { User }                     from '../models/user';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss']
})
export class BeerComponent implements OnInit, OnChanges {

  beer: Beer;
  beers: string[] = [];
  user: User;
  msgs: Message[] = [];
  //  true -> edit mode, false -> show mode
  isEdit: boolean = false;
  //  true -> create mode, false -> show mode
  isCreate: boolean = false;
  // input class to show input field
  inputClass = '';
  // category for drop-down
  category_selected: number;
  categories: Category[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private beerService: BeerService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    var id = this.route.snapshot.params['id'];

    id? this.getBeer(id) : this.createBeer();

    this.getUser();
    this.getCategories();
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    if(changes['beer']) this.ngOnInit();
  }

  getBeer(id: number){
    this.beerService.getBeer(id).then(
      (res) => {
        this.beer = res['data'];
        this.category_selected = this.beer['category']['id'];
      },
      (error) => {
        console.log('error', error)
      }
    )
  }

  ////
  //@function createBeer
  //@desc init field to Create a New Beer
  //@param
  //@result
  ////
  createBeer(){
    this.beer = new Beer();
    this.beer.name = '';
    this.beer.manufacurter = '';
    this.beer.category_id = 0;
    this.beer.country = '';
    this.beer.price = 0;
    this.edit();
    this.isCreate = true;
  }

  getUser(){
    let userInfo = localStorage.getItem('user');
    let userObj = JSON.parse(userInfo);
    this.user = userObj;
  }


  ////
  //@function archive
  //@desc archive a beer or unarchive beer
  //@param id- > beer_id
  //@result
  ////
  archive(id: number){
    if(this.beer.archived){
      this.beerService.unarchiveBeer(id).then(
        (res) => {
          this.noticeMessage('Beer is available', 0);
          this.beer.archived  = false;
        },
        (error) => {
          this.noticeMessage(JSON.parse(error['_body']).error);
        }
      )
    }else{
      this.beerService.archiveBeer(id).then(
        (res) => {
          this.noticeMessage('Beer is archived', 0);
          this.beer.archived = true;
        },
        (error) => {
          this.noticeMessage(JSON.parse(error['_body']).error);
        }
      )
    }
  }

  ////
  //@function getCategories
  //@desc get categories from service to show when edit a beer
  //@param
  //@result
  ////
  getCategories(){
    this.categoryService.getCategories().then(
      res => {
        this.categories = res['data'];
      },
      error => {
        console.log('error', error);
      }
    )
  }

  ////
  //@function save
  //@desc update or create beer
  //@param
  //@result
  ////
  save(){
    // create abeer
    if(this.isCreate){
      this.beerService.addBeer(this.getBeerPost()).then(
        (res) => {
          this.noticeMessage('Create success', 0);
          this.redirectToBoard();
        },
        (error) => {
          this.noticeMessage(JSON.parse(error['_body']).error);
        }
      )
    }else{
      // update abeer
      this.beerService.updateBeer(this.beer.id, this.getBeerPost()).then(
        (res) => {
          this.noticeMessage('Update success', 0);
          this.cancel();
        },
        (error) => {
          this.noticeMessage(JSON.parse(error['_body']).error);
        }
      )
    }
  }

  getBeerPost(){
    this.beer.category_id = this.category_selected;
    var beerPost = new BeerPost();
    beerPost.beer = this.beer;
    return beerPost;
 }

  edit(){
    this.isEdit = true;
    this.inputClass = 'input-class';
  }

  cancel(){
    this.isEdit = false;
    this.inputClass = '';
  }

  redirectToBoard(){
    this.router.navigate(['']);
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
