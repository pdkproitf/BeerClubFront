import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }         from './app.component';
import { NotLoggedIn }          from './services/not-logged-in';
import { AuthenLoggedIn }       from './services/authen-logged-in';
import { AuthenAdmin }          from './services/authen-admin';
import { SignInComponent }      from './sign-in/sign-in.component';
import { SignUpComponent }      from './sign-up/sign-up.component';
import { CategoryComponent }    from './category/category.component';
import { BeerComponent }        from './beer/beer.component';
import { PassportsComponent }   from './passports/passports.component';
import { PassportComponent }    from './passport/passport.component';
import { MaketingPageComponent }from './maketing-page/maketing-page.component';
import { ChatComponent }        from './chat/chat.component';

const routes: Routes = [
    { path: 'sign-in/:role', component: SignInComponent },
    { path: 'sign-up/:role', component: SignUpComponent},
    { path: 'maketing-page', component: MaketingPageComponent},
    { path: '', component: CategoryComponent },
    { path: 'beer/:id', component: BeerComponent },
    { path: 'beer', component: BeerComponent, canActivate: [AuthenAdmin] },
    { path: 'passports', component: PassportsComponent, canActivate: [AuthenAdmin] },
    { path: 'passport/:id', component: PassportComponent, canActivate: [AuthenLoggedIn] },
    { path: 'chat', component: ChatComponent, canActivate: [AuthenLoggedIn] }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
