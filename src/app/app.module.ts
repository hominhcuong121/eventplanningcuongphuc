import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { IonicPageModule } from 'ionic-angular';
import { HttpClientModule,HttpClient } from '@angular/common/http';

import { EventDetailPage } from '../pages/event-detail/event-detail';
import { GroupOfGuestPage } from '../pages/group-of-guest/group-of-guest';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import {RegisterPage} from '../pages/register/register';
import { FileserviceProvider } from '../providers/fileservice/fileservice';
import { ProfilePage } from '../pages/profile/profile';
import { firebaseConfig } from '../enviroment';
import { EventProvider } from '../providers/event/event';
import { WaitingPage } from '../pages/waiting/waiting';
import {AboutPage} from '../pages/about/about'; 
import { AddGuestPage } from '../pages/add-guest/add-guest';

import { TaskProvider } from '../providers/task/task';
import { GroupProvider } from '../providers/group/group';
import { GuestProvider } from '../providers/guest/guest';
import { UserProvider } from '../providers/user/user'; 
import { SummaryPage } from '../pages/summary/summary';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//import { HttpModule, Http } from '@angular/http';

@NgModule({
  declarations: [

    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    ProfilePage, 
    EventDetailPage,
    GroupOfGuestPage,
    AddGuestPage,
    WaitingPage,
    AboutPage,
    SummaryPage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule.forChild(),
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule,
    AngularFirestoreModule,
    TranslateModule.forRoot(),
    
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
        }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    SummaryPage,
    EventDetailPage,
 

    GroupOfGuestPage,
  
    AddGuestPage,
  WaitingPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    FileserviceProvider,
    EventProvider,
    TaskProvider,
    GroupProvider,
    GuestProvider,
    UserProvider
  ]
})
export class AppModule {}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}