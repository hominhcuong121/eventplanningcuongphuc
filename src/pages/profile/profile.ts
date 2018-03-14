import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { UserProvider } from "../../providers/user/user";
import {User} from '../../models/user';
import {FileserviceProvider} from '../../providers/fileservice/fileservice';
import { Upload } from '../../models/upload';

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
  /*Fileupload*/
  selectedFiles: FileList | null;
  currentUpload: Upload;
  loading:any;
  url:any;
  /*fileupload*/
  user={} as User;
public filteredUsers: Array<any>;
email:string;
uid:string;
public userRef = this.db.database.ref('users');
public userExist: Array<any> = [];
  constructor(private upSvc: FileserviceProvider,public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth,public userProvider:UserProvider) {
    this.uid=this.afAuth.auth.currentUser.uid;
    
    this.email=this.afAuth.auth.currentUser.email;
  
  }
  ionViewDidLoad() {
    this.afAuth.authState.subscribe(user=>{
      if(user)
      {
     
        this.userProvider.getuserList().on('value', eventListSnapshot => {
          this.filteredUsers = [];
          eventListSnapshot.forEach(snap => {
            if (snap.key=== this.uid) {
              this.filteredUsers.push({
                key: snap.key,
                name: snap.val().name,
                uid: snap.val().uid,
                photoUrl:snap.val().photoUrl,
              });
              return false;
            }
          });
          this.user.name=this.filteredUsers[0].name;
          this.user.photoUrl=this.filteredUsers[0].photoUrl;
        });
      }
      
      
    });
   
  }
  uploadSingle() {
    const file = this.selectedFiles;
    
    if (file && file.length === 1) {
      this.currentUpload = new Upload(file.item(0));
      this.upSvc.pushUpload(this.currentUpload);
    } else {
      console.error('No file found!');
    }
  }
  detectFiles(event,url) {
    
    this.selectedFiles = event.target.files;
    console.log( this.selectedFiles[0]);
  }
  initAllUsers() {
    this.userProvider.getuserList().on('value', userListSnapshot => {
      this.filteredUsers = [];
      userListSnapshot.forEach(snap => {
        if (snap.key === this.uid) {
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
