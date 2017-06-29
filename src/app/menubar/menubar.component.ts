import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { User }           from '../models/user';
import { UserService } from '../services/user-service';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit, OnChanges {

  user: User;
  msgs: Message[] = [];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
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

  signOut(){
    let userInfo = localStorage.getItem('user');
    let userObj = JSON.parse(userInfo);
  }

  logOut(): void {
    let userInfo = localStorage.getItem('user');
    let userObj = JSON.parse(userInfo);
    console.log(userObj);
    var authPost = {
      user: {
        access_token: userObj.token,
        client: userObj.client,
        uid: userObj.uid,
        admin_mode: userObj.admin_mode
      }
    }

    this.userService.logOut(authPost).then(
        (data) => {
            localStorage.removeItem('user');
            this.router.navigate(['/']);
            let content = 'Logged out';
            this.msgs = [];
            this.msgs.push({severity: 'success', summary: 'Success', detail: content});
            this.ngOnInit();
        },
        (error) => {
            let content = JSON.parse(error['_body']).error;
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: 'Error', detail: content});
        }
    );
}
}
