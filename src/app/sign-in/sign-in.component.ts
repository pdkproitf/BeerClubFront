import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { User, UserPost } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user: User = new User();
  userPost: UserPost = new UserPost();
  mode: boolean = false;
  msgs: Message[] = [];

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) {
    localStorage.removeItem('user');
  }

  ngOnInit() {
    let para = this.route.params['_value'];
    this.mode = para['role'] === 'admin';
  }

  signIn(): void {
    this.user.admin_mode = this.mode;
    this.userPost.user = this.user;
    this.userService.signIn(this.userPost).then(
      (res) => {
        this.redirect(res);
      },
      (error) => {
        let content = JSON.parse(error['_body']).error;
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: content});
      }
    );
  }

  redirect(res){
    var user = res;
    user['admin_mode'] = this.mode;
    localStorage.setItem('user', JSON.stringify(user));
    let obj = localStorage.getItem('user');
    window.location.reload();
    this.router.navigate(['']);
  }

  signUp() {
    this.router.navigate(['sign-up', 'Customer']);
  }
}
