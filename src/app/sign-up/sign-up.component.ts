import { Component, OnInit }  from '@angular/core';
import { Message }            from 'primeng/primeng';
import { UserService }        from '../services/user-service';
import { User, UserPost }     from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  msgs: Message[] = [];
  user: User = new User();
  userPost: UserPost = new UserPost();
  // false -> customer mode, true -> admin mode
  mode: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let para = this.route.params['_value'];
    this.mode = para['role'] == 'admin'
  }

  signIn() {
    this.router.navigate(['sign-in', 'Customer']);
  }

  mainBoard() {
    this.router.navigate(['']);
  }

  submit(): void {
    this.user.password_confirmation = this.user.password;
    let arrayName = this.user.name.split(' ');
    this.user.name = arrayName[0];
    this.user.admin_mode = this.mode;
    this.userPost.user = this.user;
    this.userService.signUp(this.userPost).then(
      (res) => {
        this.msgs.push({severity: 'success', summary: 'Success Message', detail: res.status});
        (localStorage.getItem('user'))? this.mainBoard() : this.signIn();
      },
      (error) => {
        let content = JSON.parse(error['_body']).error;
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: content});
      }
    );
  }
}
