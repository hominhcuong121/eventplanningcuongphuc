import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import {FormBuilder, FormGroup, Validators, AbstractControl,FormControl} from '@angular/forms';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  username:AbstractControl;
  password:AbstractControl;
  constructor(public navCtrl: NavController, public navParams: NavParams,private afAuth: AngularFireAuth) {
  
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }*/
  async register(username, password) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(username, password);
      if (result) {
        this.navCtrl.setRoot(HomePage);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
