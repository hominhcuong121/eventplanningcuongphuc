import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { WaitingPage } from '../pages/waiting/waiting';
import { AboutPage } from '../pages/about/about'; 
import { AddGuestPage } from '../pages/add-guest/add-guest';
import { ProfilePage } from '../pages/profile/profile';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { GroupOfGuestPage } from '../pages/group-of-guest/group-of-guest';
import {RegisterPage} from '../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../enviroment';

import { TaskProvider } from '../providers/task/task';
import { GroupProvider } from '../providers/group/group';
import { GuestProvider } from '../providers/guest/guest'; 
import { SummaryPage } from '../pages/summary/summary';
import { EventProvider } from '../providers/event/event';
import { AuthProvider } from '../providers/auth/auth';
import { FileserviceProvider } from '../providers/fileservice/fileservice';

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
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule,
    AngularFirestoreModule
 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
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
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    FileserviceProvider,
    EventProvider,
    TaskProvider,
    GroupProvider,
    GuestProvider
  ]
})
export class AppModule {}
