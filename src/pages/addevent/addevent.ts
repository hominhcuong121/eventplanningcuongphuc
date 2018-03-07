import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../models/user";
/**
 * Generated class for the AddeventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addevent',
  templateUrl: 'addevent.html',
})
export class AddeventPage {
  uid:string;
  itemsRef: AngularFireList<any>;
  user={} as User;
  constructor(public afAuth:AngularFireAuth,public navCtrl: NavController, 
              public navParams: NavParams, public db: AngularFireDatabase,
              public alertCtrl: AlertController) {
    this.itemsRef = db.list('events');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventItemPage');
  }

  addEvent(nameEvent, myDate) {
    let alert = this.alertCtrl.create({
      title: 'Notice!',
      message: 'Do you agree to add this event?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.uid=this.afAuth.auth.currentUser.uid;
            this.itemsRef.push({name: nameEvent, uid: this.uid, date: myDate});
            this.navCtrl.pop();
          }
        }
      ]
    });

    alert.present();
    
  }


}
