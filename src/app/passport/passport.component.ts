import { Router, ActivatedRoute }   from '@angular/router';
import { Component, OnInit }   from '@angular/core';
import { PassportService }     from '../services/passport-service';
import { BeerService }         from '../services/beer-service';
import { Passport }            from '../models/passport';
import { Message }             from 'primeng/primeng';
import { User }                from '../models/user';
import { Beer }                from '../models/beer';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.scss']
})
export class PassportComponent implements OnInit {

  msgs: Message[] = [];
  passport: Passport = new Passport();
  user: User;
  // constraint all beer is available on system
  beers: Beer[] = [];
  // constraint beer which new with passport
  beers_new: Beer[] = [];
  // current beers to show
  _beers: Beer[] = [];
  // current tab
  tab: number = 0;
  // search parten
  searchBeerParten: string = '' ;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private passportService:PassportService,
    private beerService: BeerService) { }

  ngOnInit() {
    var id = this.route.snapshot.params['id'];
    this.getPassport(id);
    this.user = this.getUser();
  }

  getPassport(id: number){
    this.passportService.getPassport(id).then(
      (res) => {
        this.passport = res['data'];
        this.getBeers();
      },
      (error) => {
        this.noticeMessage(JSON.parse(error['_body']).error);
      }
    )
  }

  getBeers(){
    this.beerService.getBeers().then(
      (res) => {
        this.beers = res['data'];
        this.getBeersNew(this.beers, this.passport.beers);
      },
      (error) => {
        this.noticeMessage(JSON.parse(error['_body']).error);
      }
    )
  }

  getBeersNew(beers, beers_drank){
    console.log('beers', beers);
    console.log('beers_drank', beers_drank);
    this.beers_new = [];
    for (let beer of beers) {
      if(beers_drank.findIndex(x => x.id == beer.id) == -1){
        this.beers_new.push(beer);
      }
    }
    this.onTabChange(this.tab);
  }

  addToPassport(id: number){
    var data = {
      passport_id: this.passport.id,
      beer_id: id
    }
    this.passportService.addToPassport(data).then(
      (res) => {
        this.noticeMessage('Success', 0);
        this.updateBeerList();
      },
      (error) => {
        this.noticeMessage(JSON.parse(error['_body']).error);
      }
    )
  }

  removeFromPassport(id: number){
    var data = {
      passport_id: this.passport.id,
      beer_id: id
    }
    this.passportService.removeFromPassport(data).then(
      (res) => {
        this.noticeMessage('Success', 0);
        this.updateBeerList();
      },
      (error) => {
        this.noticeMessage(JSON.parse(error['_body']).error);
      }
    )
  }

  updateBeerList(){
    this.ngOnInit();
  }

  getUser(){
    let userInfo = localStorage.getItem('user');
    let userObj = JSON.parse(userInfo);
    return userObj;
  }

  showBeer(id: number){
    this.router.navigate(['beer', id])
  }

  onTabChange(index) {
    this.searchBeerParten = '';
    this.tab = index;
    console.log('index', index);
    switch(this.tab){
      case 0: {
        this._beers = this.beers;
        break;
      }
      case 1: {
        this._beers = this.passport.beers;
        break;
      }
      case 2: {
        this._beers = this.beers_new;
        break;
      }
    }
  }

// check beer already on passport or not.
isAdd(id: number){
  return (this.passport.beers.findIndex(x => x.id == id) != -1)
}

  search(){
    var beers = this.currentBeerShow();

    this._beers = [];
    for (let beer of beers) {
      if ((beer.name.toUpperCase().indexOf(this.searchBeerParten.toUpperCase()) > -1) ||
        (beer.name.toLowerCase() .indexOf(this.searchBeerParten.toLowerCase()) > -1)) {
        this._beers.push(beer);
      }
    }
  }

  currentBeerShow(){
    let beers: Beer[] = [];
    switch(this.tab){
      case 0: {
        beers = this.beers;
        break;
      }
      case 1: {
        beers = this.passport.beers;
        break;
      }
      case 2: {
        beers = this.beers_new;
        break;
      }
    }
    return beers;
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
