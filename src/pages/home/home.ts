import { Component } from '@angular/core';
<<<<<<< HEAD
import { NavController, ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AddeventPage } from '../addevent/addevent';
import { EditEventPage } from '../edit-event/edit-event';
import { EventDetailPage } from '../event-detail/event-detail';
=======
import { NavController } from 'ionic-angular';

>>>>>>> 7697d42ce17734cb6b955e9a0187b1254e8f2626
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

<<<<<<< HEAD
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  
  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public modalCtrl: ModalController) {
    this.items = db.list('events').valueChanges();
    this.itemsRef = db.list('events');
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage'); 
  }

  addEvent() {
    this.navCtrl.push(AddeventPage);
  }

  deleteEvent(item : string) {
    this.itemsRef.remove(item);
  }

  editEvent(item) {
    this.navCtrl.push(EditEventPage, item);
    alert(item);
  }

  openEventDetail(item) {
    this.navCtrl.push(EventDetailPage, item);
  }

}


=======
  constructor(public navCtrl: NavController) {

  }

}
>>>>>>> 7697d42ce17734cb6b955e9a0187b1254e8f2626
