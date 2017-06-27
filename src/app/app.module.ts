import { NgModule }         from '@angular/core';
import { AppComponent }     from './app.component';
import { BrowserModule }    from '@angular/platform-browser';
import { SignInComponent }  from './sign-in/sign-in.component';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule }         from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
