import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController, AlertController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../models/user";

import {FormBuilder, FormGroup, Validators, AbstractControl,FormControl} from '@angular/forms';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 
 
  formgroup:FormGroup;
  username:AbstractControl;
  password:AbstractControl;

  /*login() {
    this.afAuth.auth.signInWithEmailAndPassword(new firebase.auth.EmailAuthProvider());

  }*/
  /*login(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword("hoangphucuit@gmail.com", "aa1234");
  }*/
  
  /*ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }*/
  user = {} as User;
 
  /*constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth,public formbuilder:FormBuilder) {
    this.formgroup = formbuilder.group({
      username:['',Validators.required,Validators.minLength(5)],
      password:['',Validators.required,Validators.maxLength(15)]
    });

    this.username = this.formgroup.controls['username'];
    this.password = this.formgroup.controls['password'];

}
  */
 constructor(public alertCtrl:AlertController,public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth,public formbuilder:FormBuilder) {
  this.formgroup = formbuilder.group({
    username: new FormControl('', Validators.compose([
      Validators.required,
      
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ]))
  ,
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(6),
     
    ]))
  });

  this.username = this.formgroup.controls['username'];
  this.password = this.formgroup.controls['password'];

}
 
  async login(user: User) {
    try {
      
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      
      if (result) {
        let loading=this.loadingCtrl.create({
          content: 'Logging...'
        });
        loading.present();
        this.navCtrl.setRoot(HomePage);
        setTimeout(() => {
          loading.dismiss();
        }, 3000);
        
      }  
    }
    catch (e) {
      let alertinfo=this.alertCtrl.create({
        title:'Notification!',
        subTitle:'Wrong username or password, Please try agian',
        buttons:['OK'],
      });
      alertinfo.present();
     
      console.log(e);
    }
  }
  register(){
    this.navCtrl.push(RegisterPage);
  }
}
 
  










