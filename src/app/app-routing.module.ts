import { NgModule }             from '@angular/core';
import { SignInComponent }      from './sign-in/sign-in.component';
import { AuthenLoggedIn }       from './services/authen-logged-in';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'sign-in/:role', component: SignInComponent, canActivate: [AuthenLoggedIn] }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
