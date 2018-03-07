import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
<<<<<<< HEAD
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { RegisterPage } from '../pages/register/register';
import { AddeventPage } from '../pages/addevent/addevent';
import { EditEventPage } from '../pages/edit-event/edit-event';
import { EventDetailPage } from '../pages/event-detail/event-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { firebaseConfig } from '../enviroment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { FileserviceProvider } from '../providers/fileservice/fileservice';
import { AddTaskPage } from '../pages/add-task/add-task';
=======

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
>>>>>>> 7697d42ce17734cb6b955e9a0187b1254e8f2626

@NgModule({
  declarations: [
    MyApp,
    HomePage,
<<<<<<< HEAD
    ListPage,
    LoginPage,
    RegisterPage,
    ProfilePage, 
    AddeventPage,
    EditEventPage,
    EventDetailPage,
    AddTaskPage
=======
    ListPage
>>>>>>> 7697d42ce17734cb6b955e9a0187b1254e8f2626
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
<<<<<<< HEAD
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule,
 
=======
>>>>>>> 7697d42ce17734cb6b955e9a0187b1254e8f2626
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
<<<<<<< HEAD
    ListPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    AddeventPage,
    EditEventPage,
    EventDetailPage,
    AddTaskPage
=======
    ListPage
>>>>>>> 7697d42ce17734cb6b955e9a0187b1254e8f2626
  ],
  providers: [
    StatusBar,
    SplashScreen,
<<<<<<< HEAD
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    FileserviceProvider
=======
    {provide: ErrorHandler, useClass: IonicErrorHandler}
>>>>>>> 7697d42ce17734cb6b955e9a0187b1254e8f2626
  ]
})
export class AppModule {}
