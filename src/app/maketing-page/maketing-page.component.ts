import { Component, OnInit } from '@angular/core';
import { Router }     from '@angular/router';

@Component({
  selector: 'app-maketing-page',
  templateUrl: './maketing-page.component.html',
  styleUrls: ['./maketing-page.component.scss']
})
export class MaketingPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(mode: string){
    this.router.navigate(['sign-in', mode])
  }
}
