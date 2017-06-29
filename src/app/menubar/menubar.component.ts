import { Component, OnInit } from '@angular/core';
import { User }           from '../models/user';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  user: User;

  constructor() { }

  ngOnInit() {
    this.getUser();
  }
  
  getUser(){
    let userInfo = localStorage.getItem('UserInfo');
    let userObj = JSON.parse(userInfo);
    this.user = userObj;
  }
}
