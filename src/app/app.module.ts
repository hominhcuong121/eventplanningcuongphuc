import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { EditEventPage } from '../pages/edit-event/edit-event';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { AddTaskPage } from '../pages/add-task/add-task';
import { EditTaskPage } from '../pages/edit-task/edit-task';
import { GroupOfGuestPage } from '../pages/group-of-guest/group-of-guest';
import { EditGroupPage } from '../pages/edit-group/edit-group';
import { AddGuestPage } from '../pages/add-guest/add-guest';
import { EditGuestPage } from '../pages/edit-guest/edit-guest';

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
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    ProfilePage, 
    EditEventPage,
    EventDetailPage,
    AddTaskPage,
    EditTaskPage,
    GroupOfGuestPage,
    EditGroupPage,
    AddGuestPage,
    EditGuestPage,WaitingPage,
    AboutPage
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
    EditEventPage,
    EventDetailPage,
    AddTaskPage,
    EditTaskPage,
    GroupOfGuestPage,
    EditGroupPage,
    AddGuestPage,
    EditGuestPage,WaitingPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    FileserviceProvider,
    EventProvider
  ]
})
export class AppModule {}
