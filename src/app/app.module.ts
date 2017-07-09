import { NgModule }         from '@angular/core';
import { HttpModule }       from '@angular/http';
import { FormsModule }      from '@angular/forms';
import { RouterOutlet,
         RouterModule }     from "@angular/router";
import { NgbModule }        from '@ng-bootstrap/ng-bootstrap';
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
import { AuthenAdmin }            from './services/authen-admin';
import { CategoryService }        from './services/category-service';
import { PassportService }        from './services/passport-service';
import { ConversationService }    from './services/conversation-service';
import { CategoryComponent }      from './category/category.component';
import { BeerComponent }          from './beer/beer.component';
import { MenubarComponent }       from './menubar/menubar.component';
import { SignUpComponent }        from './sign-up/sign-up.component';
import { ChatComponent }          from './chat/chat.component';
import { PassportComponent }      from './passport/passport.component';
import { PassportsComponent }     from './passports/passports.component';
import { Ng2Cable, Broadcaster }  from 'ng2-cable';
import { ConversationComponent }  from './conversation/conversation.component';
import { BrowserAnimationsModule }from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    CategoryComponent,
    MenubarComponent,
    BeerComponent,
    SignUpComponent,
    PassportsComponent,
    PassportComponent,
    ChatComponent,
    ConversationComponent,
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
    TabViewModule,
    NgbModule.forRoot()
  ],
  providers: [AuthenLoggedIn, NotLoggedIn, UserService, CategoryService,
    BeerService, PassportService, AuthenAdmin, Ng2Cable, Broadcaster,
    ConversationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
