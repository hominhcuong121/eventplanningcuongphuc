import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { UserProvider } from "../../providers/user/user";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
public filteredUsers: Array<any>;
email:string;
uid:string;
public userRef = this.db.database.ref('users');
public userExist: Array<any> = [];
  constructor(public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth,public userProvider:UserProvider) {
/*this.afAuth.authState.subscribe(user=>{
      if(user)
      {
      
        
  
        
        
      }
    });*/
    
    
    this.email=this.afAuth.auth.currentUser.email;
  
  }
  ionViewDidLoad() {
    this.afAuth.authState.subscribe(user=>{
      if(user)
      {
        this.initAllUsers();
      }
      
    });
   
  }
  initAllUsers() {
    this.userProvider.getuserList().on('value', userListSnapshot => {
      this.filteredUsers = [];
      userListSnapshot.forEach(snap => {
        if (snap.val().uid === this.uid) {
          this.filteredUsers.push({
            key: snap.key,
            name: snap.val().name,
            
          });
          return false;
        }
      });
     
    });
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
