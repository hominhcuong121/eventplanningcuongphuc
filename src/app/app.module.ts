import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
<<<<<<< HEAD
import { AngularFirestoreModule } from 'angularfire2/firestore';
=======
>>>>>>> 2c1f130ef2f4953da186f3d0310c98f075a3c658

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
<<<<<<< HEAD
=======
import { ProfilePage } from '../pages/profile/profile';
import { RegisterPage } from '../pages/register/register';
import { EditEventPage } from '../pages/edit-event/edit-event';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { AddTaskPage } from '../pages/add-task/add-task';
import { EditTaskPage } from '../pages/edit-task/edit-task';
import { GroupOfGuestPage } from '../pages/group-of-guest/group-of-guest';
import { EditGroupPage } from '../pages/edit-group/edit-group';
import { AddGuestPage } from '../pages/add-guest/add-guest';
import { EditGuestPage } from '../pages/edit-guest/edit-guest';

>>>>>>> 2c1f130ef2f4953da186f3d0310c98f075a3c658
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { firebaseConfig } from '../enviroment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
<<<<<<< HEAD
import {RegisterPage} from '../pages/register/register';
import { FileserviceProvider } from '../providers/fileservice/fileservice';
import { ProfilePage } from '../pages/profile/profile';
=======
import { FileserviceProvider } from '../providers/fileservice/fileservice';
>>>>>>> 2c1f130ef2f4953da186f3d0310c98f075a3c658

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
<<<<<<< HEAD
    ProfilePage
=======
    ProfilePage, 
    EditEventPage,
    EventDetailPage,
    AddTaskPage,
    EditTaskPage,
    GroupOfGuestPage,
    EditGroupPage,
    AddGuestPage,
    EditGuestPage
>>>>>>> 2c1f130ef2f4953da186f3d0310c98f075a3c658
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule,
<<<<<<< HEAD
    AngularFirestoreModule
=======
>>>>>>> 2c1f130ef2f4953da186f3d0310c98f075a3c658
 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
<<<<<<< HEAD
    ProfilePage
=======
    ProfilePage,
    EditEventPage,
    EventDetailPage,
    AddTaskPage,
    EditTaskPage,
    GroupOfGuestPage,
    EditGroupPage,
    AddGuestPage,
    EditGuestPage
>>>>>>> 2c1f130ef2f4953da186f3d0310c98f075a3c658
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    FileserviceProvider
  ]
})
export class AppModule {}
