import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Upload } from "../../models/upload";
import { AngularFireAuth } from 'angularfire2/auth';
import {FormBuilder, FormGroup, Validators, AbstractControl,FormControl} from '@angular/forms';
import { LoadingController,ToastController,AlertController  } from 'ionic-angular';


import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
//import {storage} from 'firebase';
//import { File } from 'firebase/firestore';


import {FileserviceProvider} from '../../providers/fileservice/fileservice';
import { AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { LoginPage } from '../login/login';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  loading:any;
userve :Promise<any>;
  
  
  constructor( public alertCtrl:AlertController,private afAuth: AngularFireAuth,public loadingCtrl:LoadingController,private fb: FormBuilder, private auth: AuthProvider,public navCtrl:NavController) { 
   
  }
  async signup(user) {
    try {
      if(this.auth.checkretypepassword(user.password,user.repassword)){
        
        const result= await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
              console.log(result.uid);
              
        if(result.sendEmailVerification().then(function(user){
          console.log("email verification sent to user");
          return true;
        }).catch(function(error){
            console.log(error);
            
        }))
{        
          this.auth.addUser(user,result.uid);
          this.navCtrl.setRoot(LoginPage);
        }
       
      /*.then(function(user){
        this.userve=user;
        if(user && user.emailVerified === false){
           user.sendEmailVerification().then(function(){

            console.log("email verification sent to user");
            
          });
          
          
        } 

      
      }).catch(function(error) {
       
      var errorCode = error.code;
       var errorMessage = error.message;
  
       console.log(errorCode, errorMessage);
     });
     console.log(this.afAuth.auth.currentUser);*/
    }
    } catch (e) {  
     
      
      this.auth.checkerror(e.code);

  }    
  }















  /*selectedFiles: FileList | null;
  currentUpload: Upload;
  user = {} as User;
  loading:any;
  url:any;*/
  //username:AbstractControl;
  //password:AbstractControl;
  /*constructor(private upSvc: FileserviceProvider,public toastCtrl:ToastController,public loadingCtrl: LoadingController,public navCtrl: NavController,  public db: AngularFireDatabase,public navParams: NavParams,private afAuth: AngularFireAuth) {
    

  }*/

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }*/
  /*uploadSingle() {
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
    console.log(url);
  }*/

  /*async register(user) {
    console.log(user.avarta);
    if(user.password==user.repassword)
    {
    try {
      
      this.loading = this.loadingCtrl.create({
        content: 'Adding user...'
      });
      this.loading.present();
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.username, user.password);
      if (result) {
        
        this.db.database.ref('users/' + result.uid).set({
          name: user.name,
          email: user.username,
        });
        this.navCtrl.setRoot(HomePage);
        setTimeout(() => {
          this.loading.dismiss();
        }, 3000);
        

      }
    } catch (e) {

      console.log(e);
    }
  }
  else
  {
    alert("Retype password not match");
  }
  }*/


}
