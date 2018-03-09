import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { EditGroupPage } from '../edit-group/edit-group';
import { AddGuestPage } from '../add-guest/add-guest';

/**
 * Generated class for the GroupOfGuestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-of-guest',
  templateUrl: 'group-of-guest.html',
})
export class GroupOfGuestPage {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  eventId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public db: AngularFireDatabase, public alertCtrl: AlertController) {
    this.itemsRef = db.list('groups');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.eventId = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupOfGuestPage');
  }

  addGroup(eventId, groupName) {
    let alert = this.alertCtrl.create({
      title: 'Notice!',
      message: 'Do you agree to add this group?',
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
            this.itemsRef.push({groupName: groupName, eventId: this.eventId});
          }
        }
      ]
    });

    alert.present();
  }

  editGroup(item) {
    this.navCtrl.push(EditGroupPage, item);
  }

  deleteGroup(item) {
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

  openAddGuestPage(groupId, EventId) {
    // console.log(groupId, this.eventId);
    this.navCtrl.push(AddGuestPage, {
      groupId: groupId,
      eventId: this.eventId
    });
  }

}
