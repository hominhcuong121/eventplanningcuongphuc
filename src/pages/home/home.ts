import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { EditEventPage } from '../edit-event/edit-event';
import { EventDetailPage } from '../event-detail/event-detail';
import { AngularFireAuth } from 'angularfire2/auth';
import { GroupOfGuestPage } from '../group-of-guest/group-of-guest';
import * as firebase from 'firebase';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  uid:string;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  
  constructor(public db: AngularFireDatabase, public navCtrl: NavController, 
              public modalCtrl: ModalController, public alertCtrl: AlertController,
              public afAuth:AngularFireAuth
            ) {
              
    this.uid = this.afAuth.auth.currentUser.uid;
    this.items = db.list('events').valueChanges();
    this.itemsRef = db.list('events');
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage'); 
  }

  addEvent(nameEvent) {
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
            this.itemsRef.push({name: nameEvent, uid: this.uid});
          }
        }
      ]
    });

    alert.present();
    
  }
findEvent(eventName:string){
  var ref = firebase.database().ref("events");
  
  ref.on("value", function(snapshot) {
   if(snapshot.val().name=="cuong")
   {
     console.log('trung');
     return;

   }
  });
  
}
  deleteEvent(eventId : string) {
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
            this.itemsRef.remove(eventId);
          }
        }
      ]
    });

    alert.present();
    
  }

  editEvent(eventId) {
    this.navCtrl.push(EditEventPage, eventId);
  }

  openEventDetail(eventId) {
    this.navCtrl.push(EventDetailPage, eventId);
    // console.log(eventId);
  }

  addGroupOfGuest(eventId) {
    this.navCtrl.push(GroupOfGuestPage, eventId);
  }

}


