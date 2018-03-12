import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { ListPage } from '../pages/list/list';
import {ProfilePage} from '../pages/profile/profile';
import { User } from '../models/user';

import { HomePage } from '../pages/home/home';
import { Nav, Platform } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import * as firebase from 'firebase';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AuthProvider} from '../providers/auth/auth'; 
import { WaitingPage } from '../pages/waiting/waiting';
import { AboutPage } from '../pages/about/about';
import { AddGuestPage } from '../pages/add-guest/add-guest';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
rootPage: any=HomePage;
  
 
 
  pages: Array<{title: string,icon:string,component: any}>;
public user:any;
  constructor(public authSvc:AuthProvider,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    
    this.initializeApp();
    
    
   
   
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Events', icon:'home',component: HomePage },
      {title:'Chart',icon:'pie',component:AddGuestPage},
      { title: 'Profile',icon:'person', component: ProfilePage },
      {title:'About Us',icon:'information-circle',component:AboutPage},
      
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
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    
    
   
   

  }, function(error) {
    // An error happened.
    console.log(error);

  });
 }
}
