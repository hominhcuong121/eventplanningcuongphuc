import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { ListPage } from '../pages/list/list';
import {ProfilePage} from '../pages/profile/profile';
import { User } from '../models/user';
import * as firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { Nav, Platform } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { SplashScreen } from '@ionic-native/splash-screen';


export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
 
  pages: Array<{title: string,icontitle:string ,component: any}>;
public user:any;
  constructor(public afAuth: AngularFireAuth,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Events',icontitle: 'briefcase', component: HomePage },
      { title: 'Favorites Events',icontitle: 'heart' ,component: ListPage },
      { title: 'Test',icontitle: 'chatbubbles', component: HomePage },
      { title: 'Location',icontitle: 'map' ,component: ListPage },
      { title: 'Help',icontitle: 'help-buoy' ,component: HomePage },
    ];
   

  
  }
  ionViewDidLoad() {
    
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
   
  }
  


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    
    this.nav.setRoot(page.component);
  }
  logout(){
    
     /* if (this.afAuth.auth.currentUser() !== null) {
      }
*/
    
  }
}
