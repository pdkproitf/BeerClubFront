import { NgModule }         from '@angular/core';
import { HttpModule }       from '@angular/http';
import { AppComponent }     from './app.component';
import { BrowserModule }    from '@angular/platform-browser';
import { SignInComponent }  from './sign-in/sign-in.component';
import { AppRoutingModule } from './app-routing.module';
import { NotLoggedIn }          from './services/not-logged-in';
import { UserService }          from './services/user-service';
import { AuthenLoggedIn }       from './services/authen-logged-in';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from "@angular/router";
import { MaketingPageComponent } from './maketing-page/maketing-page.component';
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    MaketingPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
  ],
  providers: [AuthenLoggedIn, NotLoggedIn, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
