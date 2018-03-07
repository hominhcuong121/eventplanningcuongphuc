import { Component } from '@angular/core';
<<<<<<< HEAD
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
=======
import { IonicPage, NavController, NavParams } from 'ionic-angular';
>>>>>>> 2479dbb8ffc7b4208ae97a23963ffe7754fcfc7a

/**
 * Generated class for the AddTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})
export class AddTaskPage {

<<<<<<< HEAD
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  eventId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public db: AngularFireDatabase, public alertCtrl: AlertController) {
    this.itemsRef = db.list('tasks');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.eventId = this.navParams.data;
=======
  constructor(public navCtrl: NavController, public navParams: NavParams) {
>>>>>>> 2479dbb8ffc7b4208ae97a23963ffe7754fcfc7a
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskPage');
  }

<<<<<<< HEAD
  addTask(eventId, nameTask: string, receipts: number, expenditures: number) {
    let alert = this.alertCtrl.create({
      title: 'Notice!',
      message: 'Do you agree to add this task?',
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
            this.itemsRef.push({nameTask: nameTask, eventId: this.eventId, receipts: receipts, expenditures: expenditures});
            this.navCtrl.pop();
          }
        }
      ]
    });

    alert.present();
  }

=======
>>>>>>> 2479dbb8ffc7b4208ae97a23963ffe7754fcfc7a
}
