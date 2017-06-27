import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }         from './app.component';
import { NotLoggedIn }          from './services/not-logged-in';
import { AuthenLoggedIn }       from './services/authen-logged-in';
import { SignInComponent }      from './sign-in/sign-in.component';
import { MaketingPageComponent } from './maketing-page/maketing-page.component';

const routes: Routes = [
    { path: 'sign-in/:role', component: SignInComponent, canActivate: [NotLoggedIn] },
    { path: 'maketing-page', component: MaketingPageComponent, canActivate: [NotLoggedIn] }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
