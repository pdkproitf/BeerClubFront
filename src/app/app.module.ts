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
         GrowlModule}     from 'primeng/primeng';
import { NotLoggedIn }            from './services/not-logged-in';
import { UserService }            from './services/user-service';
import { BeerService }            from './services/beer-service';
import { AuthenLoggedIn }         from './services/authen-logged-in';
import { CategoryService }        from './services/category-service';
import { CategoryComponent }      from './category/category.component';
import { MaketingPageComponent }  from './maketing-page/maketing-page.component';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { MenubarComponent } from './menubar/menubar.component';
import { BeerComponent } from './beer/beer.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    MaketingPageComponent,
    CategoryComponent,
    MenubarComponent,
    BeerComponent,
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
    GrowlModule
  ],
  providers: [AuthenLoggedIn, NotLoggedIn, UserService, CategoryService, BeerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
