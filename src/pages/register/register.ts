import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
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
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  selectedFiles: FileList | null;
  currentUpload: Upload;
  user = {} as User;
  loading:any;
  url:any;
  //username:AbstractControl;
  //password:AbstractControl;
  constructor(private upSvc: FileserviceProvider,public toastCtrl:ToastController,public loadingCtrl: LoadingController,public navCtrl: NavController,  public db: AngularFireDatabase,public navParams: NavParams,private afAuth: AngularFireAuth) {
    

  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }*/
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
    console.log(url);
}

  async register(user) {
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
          firstLogin: true
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
  }
}
