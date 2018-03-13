
import { Injectable ,ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';
import { LoadingController, Alert, AlertController} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../../pages/home/home';
import * as firebase from "firebase";
import { User } from '../../models/user';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()

export class AuthProvider {


 
  user = {} as User;
  loading:any;
  private currentUser: firebase.User;
  //username:AbstractControl;
  //password:AbstractControl;
  constructor(public alertCtrl:AlertController,public loadingCtrl: LoadingController,  
    public db: AngularFireDatabase,
    private afAuth: AngularFireAuth,private auth$: AngularFireAuth
    
  ) {
    afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);

  }
  
  /*ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }*/
  get authenticated(): boolean {
    return this.currentUser !== null;
  }

  resetdialog() {
    let alert = this.alertCtrl.create({
      title: 'Reset Password',
      inputs: [
        {
          name: 'username',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Reset',
          handler: data => {
            if (data) {
              console.log(data.username);

              this.afAuth.auth.sendPasswordResetEmail(data.username)
              .then(() => {
                
                console.log("email sent");
                let alertinfo=this.alertCtrl.create({
                  title:'Notification!',
                  subTitle:'Please check your Email and reset your password!',
                  buttons:['OK'],
                });
                alertinfo.present();
              })
              .catch((error) => {
                console.log(error.code);
              });
            } else {
              
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
  checkretypepassword(password,repassword){
    if(password!=repassword)
    {
      let alertinfo=this.alertCtrl.create({
        title:'Error!',
        subTitle:' Retype password is not match',
        buttons:['OK'],
      });
      alertinfo.present();
        return false;
    }
    return true;
  }
addUser(user,uid:string){
  return this.db.database.ref('users/' + uid).set({
    name: user.name,
    email: user.email,
    photoUrl:'../../assets/imgs/avar1.jpg',
  });
}
 
checkerror(e){
  
  if (e == 'auth/weak-password') {
        
    let alertinfo=this.alertCtrl.create({
      title:'Error!',
      subTitle:'The password is too weak',
      buttons:['OK'],
    });
    alertinfo.present();
  }
  if(e=='auth/email-already-in-use') 
  {
    let alertinfo=this.alertCtrl.create({
      title:'Error!',
      subTitle:'Email is already use',
      buttons:['OK'],
    });
    alertinfo.present();
  }
  if(e=='auth/invalid-email')
  {
    let alertinfo=this.alertCtrl.create({
      title:'Error!',
      subTitle:'Email is not valid',
      buttons:['OK'],
    });
    alertinfo.present();
  }
}
}
