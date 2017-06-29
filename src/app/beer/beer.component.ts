import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { BeerService }              from '../services/beer-service';
import { Message }                  from 'primeng/primeng';
import { User }                     from '../models/user';
import { Beer }                     from '../models/beer';

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

  constructor(private route: ActivatedRoute, private beerService: BeerService) { }

  ngOnInit() {
    var id = this.route.snapshot.params['id'];
    this.beerService.getBeer(id).then(
      (res) => {
        this.beer = res['data'];
        console.log('beer', this.beer);
      },
      (error) => {
        console.log('error', error)
      }
    )
    this.getUser();
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    if(changes['beer']) this.ngOnInit();
  }

  getUser(){
    let userInfo = localStorage.getItem('user');
    let userObj = JSON.parse(userInfo);
    this.user = userObj;
  }

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
