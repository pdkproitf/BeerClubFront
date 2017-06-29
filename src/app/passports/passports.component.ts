import { Passport, PassportPost } from '../models/passport';
import { Component, OnInit }      from '@angular/core';
import { PassportService }        from '../services/passport-service';
import { Beer }           from '../models/beer';

@Component({
  selector: 'app-passports',
  templateUrl: './passports.component.html',
  styleUrls: ['./passports.component.scss']
})
export class PassportsComponent implements OnInit {

  passports: Passport[] = [];

  constructor(private passportService:PassportService) { }

  ngOnInit() {
    this.getPassports();
  }

  getPassports(){
    this.passportService.getPassports().then(
      (res) => {
        this.passports = res['data'];
        console.log('passport', this.passports);
      },
      (error) =>{
        console.log('error', error['_body']);
      }
    )
  }

}
