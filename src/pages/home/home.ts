import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { EventDetailPage } from '../event-detail/event-detail';
import { AngularFireAuth } from 'angularfire2/auth';
import { GroupOfGuestPage } from '../group-of-guest/group-of-guest';
import { EventProvider } from "../../providers/event/event";
import { LoginPage } from '../login/login';
import { SummaryPage } from '../summary/summary';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public filteredEvents: Array<any>;
  public numberOfAllEvents: number;

  public uid: string;
  public itemsRef: AngularFireList<any>;
  public items: Observable<any[]>;

  public taskRef: AngularFireList<any>;
  public task: Observable<any[]>;
  public groupRef: AngularFireList<any>;
  public group: Observable<any[]>;
  public guestRef: AngularFireList<any>;
  public guest: Observable<any[]>;
  public tasksRef = this.db.database.ref('tasks');
  public groupsRef = this.db.database.ref('groups');
  public guestsRef = this.db.database.ref('guests');

  public eventRef = this.db.database.ref('events');
  public userRef = this.db.database.ref('users');
  public eventExist: Array<any> = [];

  constructor(public db: AngularFireDatabase, public navCtrl: NavController,
    public modalCtrl: ModalController, public alertCtrl: AlertController,
    public afAuth: AngularFireAuth, public eventProvider: EventProvider
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.uid = this.afAuth.auth.currentUser.uid;
        this.items = db.list('events').valueChanges();
        this.itemsRef = db.list('events');
        this.items = this.itemsRef.snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
        
        this.task = db.list('tasks').valueChanges();
        this.taskRef = db.list('tasks');
        this.task = this.taskRef.snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });

        this.group = db.list('groups').valueChanges();
        this.groupRef = db.list('groups');
        this.group = this.groupRef.snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });

        this.guest = db.list('guests').valueChanges();
        this.guestRef = db.list('guests');
        this.guest = this.guestRef.snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
      } else {
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.initAllEvents();
      }
    });
  }

  addEvent(eventId: string) {
    let alert = this.alertCtrl.create({
      title: 'Add Event',
      message: "Please enter an event's name",
      inputs: [
        {
          name: 'eventName',
          placeholder: "event's name"
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.eventRef.on('value', snapshot => {
              
              this.eventExist = [];
              snapshot.forEach(data => {
                if (data.val().uid == this.uid) {
                  this.eventExist.push(data.val().name.toLowerCase());
                }
                return false;
              });
            });
            if (data.eventName === undefined || data.eventName.trim() === '') {
              let alert = this.alertCtrl.create({
                title: "Failed...",
                subTitle: "Event's name cannot be empty",
                buttons: ['Dismiss']
              });
              alert.present();
            }
            else {
              data.eventName = data.eventName.trim().toLowerCase();
              if (this.eventExist.indexOf(data.eventName) === -1) {
                this.itemsRef.push({ name: data.eventName, uid: this.uid });
                console.log(this.eventExist);
              }
              else {
                let alert = this.alertCtrl.create({
                  title: 'Notice!!!',
                  subTitle: "Event's name has already existed. Please enter another name",
                  buttons: ['Dismiss']
                });
                alert.present();
              }
            }
          }
        }
      ]
    });

    alert.present();
  }

  deleteEvent(eventId: string) {
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
            //delete all tasks belong to this event if this one is deleted
            this.tasksRef.on('value', taskSnap => {
              taskSnap.forEach(snap => {
                if(snap.val().eventId === eventId){
                  this.taskRef.remove(snap.key);
                }
                return false;
              });
            });
            //delete all groups belong to this event if this one is deleted
            this.groupsRef.on('value', groupSnap => {
              groupSnap.forEach(snap => {
                if(snap.val().eventId === eventId){
                  this.groupRef.remove(snap.key);
                }
                return false;
              });
            });
            //delete all guests belong to this event if this one is deleted
            this.guestsRef.on('value', guestSnap => {
              guestSnap.forEach(snap => {
                if(snap.val().eventId === eventId){
                  this.guestRef.remove(snap.key);
                }
                return false;
              });
            });
          }
        }
      ]
    });
    alert.present();
  }

  editEvent(item) {
    let alert = this.alertCtrl.create({
      title: 'Edit Event',
      inputs: [
        {
          name: "name",
          placeholder: "Enter your new event's name"
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
          text: 'Save',
          handler: data => {
            if (data.name.trim() === '') {
              let alert = this.alertCtrl.create({
                title: 'Notice!!!',
                subTitle: "Event's name cannot be empty",
                buttons: ['Dismiss']
              });
              alert.present();
            }
            else {
              data.name = data.name.trim();
              if (this.eventExist.indexOf(data.name.toLowerCase()) === -1) {
                this.itemsRef.update(item.key, { name: data.name, uid: this.uid });
              }
              else {
                let alert = this.alertCtrl.create({
                  title: 'Notice!!!',
                  subTitle: "Event's name has already existed. Please enter another name",
                  buttons: ['Dismiss']
                });
                alert.present();
              }
            }
          }
        }
      ]
    });
    alert.present();
  }

  openEventDetail(eventId, eventName) {
    this.navCtrl.push(EventDetailPage, {
      eventId: eventId,
      eventName: eventName
    });
  }

  addGroupOfGuest(eventId, eventName) {
    this.navCtrl.push(GroupOfGuestPage, {
      eventId: eventId,
      eventName: eventName
    });
  }

  filterItems(ev: any) {
    let val = ev.target.value;

    if (val === null || val.trim() === '') {
      this.initAllEvents();
    }

    if (val && val.trim() !== '') {
      this.eventProvider.getEventList().on('value', eventListSnapshot => {
        let allEvents = [];
        eventListSnapshot.forEach(snap => {
          if (snap.val().uid === this.uid) {
            allEvents.push({
              key: snap.key,
              name: snap.val().name,
              uid: snap.val().uid
            });
            return false;
          }
        });

        this.filteredEvents = allEvents.filter(e => e.name.toLowerCase().includes(val.toLowerCase()));
      });
    }
  }

  initAllEvents() {
    this.eventProvider.getEventList().on('value', eventListSnapshot => {
      this.filteredEvents = [];
      eventListSnapshot.forEach(snap => {
        if (snap.val().uid === this.uid) {
          this.filteredEvents.push({
            key: snap.key,
            name: snap.val().name,
            uid: snap.val().uid
          });
          return false;
        }
      });
      this.numberOfAllEvents = this.filteredEvents.length;
    });
  }

  openSummary(item) {
    this.navCtrl.push(SummaryPage, item);
  }
}


