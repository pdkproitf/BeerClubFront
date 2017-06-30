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
  _passports: Passport[] = [];
  searchPassportParten: string ='';

  constructor(private passportService:PassportService) { }

  ngOnInit() {
    this.getPassports();
  }

  getPassports(){
    this.passportService.getPassports().then(
      (res) => {
        this.passports = res['data'];
        this._passports = this.passports;
      },
      (error) =>{
        console.log('error', error['_body']);
      }
    )
  }

  search(){
    this._passports = [];
    for (let passport of this.passports) {
      if ((passport.name.toUpperCase().indexOf(this.searchPassportParten.toUpperCase()) > -1) ||
        (passport.name.toLowerCase() .indexOf(this.searchPassportParten.toLowerCase()) > -1)) {
        this._passports.push(passport);
      }
    }
  }
}
