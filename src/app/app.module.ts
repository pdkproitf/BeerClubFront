import { NgModule }         from '@angular/core';
import { HttpModule }       from '@angular/http';
import { FormsModule }      from '@angular/forms';
import { RouterOutlet,
         RouterModule }     from "@angular/router";
import { BrowserModule }    from '@angular/platform-browser';
import { AppComponent }     from './app.component';
import { SignInComponent }  from './sign-in/sign-in.component';
import { AppRoutingModule } from './app-routing.module';
import { AccordionModule,
         DialogModule,
         GrowlModule,
         ButtonModule,
         TabViewModule}           from 'primeng/primeng';
import { NotLoggedIn }            from './services/not-logged-in';
import { UserService }            from './services/user-service';
import { BeerService }            from './services/beer-service';
import { AuthenLoggedIn }         from './services/authen-logged-in';
import { AuthenAdmin }         from './services/authen-admin';
import { CategoryService }        from './services/category-service';
import { PassportService }        from './services/passport-service';
import { CategoryComponent }      from './category/category.component';
import { MaketingPageComponent }  from './maketing-page/maketing-page.component';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { MenubarComponent } from './menubar/menubar.component';
import { BeerComponent } from './beer/beer.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PassportsComponent } from './passports/passports.component';
import { PassportComponent } from './passport/passport.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    MaketingPageComponent,
    CategoryComponent,
    MenubarComponent,
    BeerComponent,
    SignUpComponent,
    PassportsComponent,
    PassportComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    AccordionModule,
    BrowserAnimationsModule,
    DialogModule,
    GrowlModule,
    ButtonModule,
    TabViewModule
  ],
  providers: [AuthenLoggedIn, NotLoggedIn, UserService, CategoryService,
      BeerService, PassportService, AuthenAdmin],
  bootstrap: [AppComponent]
})
export class AppModule { }
