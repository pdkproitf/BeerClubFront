import { Component }  from '@angular/core';
import { Router, NavigationEnd }     from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Beer Club';

  constructor(private router: Router){
    // this.router.navigate(['category'])
    this.router.events.subscribe(event =>{
      if (event instanceof NavigationEnd) {
        event.url.includes('sign-in');
        event.url.includes('sign-up');
        event.url.includes('beer');
        event.url.includes('passports');
      }
    })
  }
}
