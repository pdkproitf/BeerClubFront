import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { BeerService }                 from '../services/beer-service';
import { Beer }                     from '../models/beer';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss']
})
export class BeerComponent implements OnInit, OnChanges {

  beer: Beer;
  beers: string[] = [];

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
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
      if(changes['beer']) this.ngOnInit();
  }

}
