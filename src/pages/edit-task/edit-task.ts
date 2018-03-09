import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the EditTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-task',
  templateUrl: 'edit-task.html',
})
export class EditTaskPage {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public db: AngularFireDatabase, public alertCtrl: AlertController) {
    this.itemsRef = db.list('tasks');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.item = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditTaskPage');
  }

  editTask(item, nameTask, receipts, expenditures) {
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
            this.itemsRef.update(item.key, { nameTask: nameTask, receipts: receipts, expenditures: expenditures });
            this.navCtrl.pop();
          }
        }
      ]
    });

    alert.present();
  }

}
