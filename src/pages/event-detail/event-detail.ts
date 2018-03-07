import { Component } from '@angular/core';
<<<<<<< HEAD
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AddTaskPage } from '../add-task/add-task';
import { EditTaskPage } from '../edit-task/edit-task';
import { forEach } from '@firebase/util';
=======
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
>>>>>>> 2479dbb8ffc7b4208ae97a23963ffe7754fcfc7a

/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
<<<<<<< HEAD
  eventId: string;

  constructor(public db: AngularFireDatabase, public navCtrl: NavController, 
              public modalCtrl: ModalController, public navParams: NavParams,
              public alertCtrl: AlertController) {
    this.eventId = this.navParams.data;
=======

  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public modalCtrl: ModalController) {
>>>>>>> 2479dbb8ffc7b4208ae97a23963ffe7754fcfc7a
    this.items = db.list('tasks').valueChanges();
    this.itemsRef = db.list('tasks');
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
<<<<<<< HEAD
    
=======
>>>>>>> 2479dbb8ffc7b4208ae97a23963ffe7754fcfc7a
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

<<<<<<< HEAD
  addTask(eventId) {
    this.navCtrl.push(AddTaskPage, eventId);
    console.log(eventId);
  }

  editTask(item) {
    this.navCtrl.push(EditTaskPage, item);
  }

  deleteTask(item) {
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

=======
>>>>>>> 2479dbb8ffc7b4208ae97a23963ffe7754fcfc7a
}
