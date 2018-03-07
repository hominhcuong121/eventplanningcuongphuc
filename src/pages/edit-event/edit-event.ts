import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the EditEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-event',
  templateUrl: 'edit-event.html',
})
export class EditEventPage {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
               public db: AngularFireDatabase, public alertCtrl: AlertController) {
    this.itemsRef = db.list('events');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.item = this.navParams.data;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditEventItemPage');
  }

<<<<<<< HEAD
  editEvent(item, newName: string) {
=======
  editEvent(item, newName: string, myDate: Date) {
>>>>>>> 2479dbb8ffc7b4208ae97a23963ffe7754fcfc7a
    let alert = this.alertCtrl.create({
      title: 'Notice!',
      message: 'Do you agree to edit this?',
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
<<<<<<< HEAD
            this.itemsRef.update(item.key, { name: newName });
=======
            this.itemsRef.update(item.key, { name: newName, date: myDate });
>>>>>>> 2479dbb8ffc7b4208ae97a23963ffe7754fcfc7a
            this.navCtrl.pop();
          }
        }
      ]
    });

    alert.present();
  }

}
