import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }         from './app.component';
import { NotLoggedIn }          from './services/not-logged-in';
import { AuthenLoggedIn }       from './services/authen-logged-in';
import { SignInComponent }      from './sign-in/sign-in.component';
import { SignUpComponent }      from './sign-up/sign-up.component';
import { CategoryComponent }    from './category/category.component';
import { BeerComponent }        from './beer/beer.component';
import { PassportsComponent }   from './passports/passports.component';
import { PassportComponent }    from './passport/passport.component';
import { MaketingPageComponent }from './maketing-page/maketing-page.component';

const routes: Routes = [
    { path: 'sign-in/:role', component: SignInComponent },
    { path: 'sign-up/:role', component: SignUpComponent},
    { path: 'maketing-page', component: MaketingPageComponent},
    { path: '', component: CategoryComponent },
    { path: 'beer/:id', component: BeerComponent },
    { path: 'beer', component: BeerComponent, canActivate: [AuthenLoggedIn] },
    { path: 'passports', component: PassportsComponent, canActivate: [AuthenLoggedIn] },
    { path: 'passport/:id', component: PassportComponent, canActivate: [AuthenLoggedIn] }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
