import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { EditGuestPage } from '../edit-guest/edit-guest';

/**
 * Generated class for the AddGuestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-guest',
  templateUrl: 'add-guest.html',
})
export class AddGuestPage {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  groupId: string;
  eventId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public db: AngularFireDatabase, public alertCtrl: AlertController) {
    this.itemsRef = db.list('guests');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.groupId = this.navParams.get('groupId');
    this.eventId = this.navParams.get('eventId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGuestPage');
  }

  addGuest(nameGuest, groupId, eventId) {
    let alert = this.alertCtrl.create({
      title: 'Notice!',
      message: 'Do you agree to add this guest?',
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
            this.itemsRef.push({guestName: nameGuest, eventId: this.eventId,
                                groupId: this.groupId, giftMoney: 0});
          }
        }
      ]
    });

    alert.present();
  }

  editGuest(item) {
    this.navCtrl.push(EditGuestPage, item);
  }

  deleteGuest(item) {
    let alert = this.alertCtrl.create({
      title: 'Notice!',
      message: 'Do you agree to delete this?',
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
            this.itemsRef.remove(item);
          }
        }
      ]
    });

    alert.present();
  }

}
