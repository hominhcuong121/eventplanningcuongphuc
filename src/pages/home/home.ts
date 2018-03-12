import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { EventDetailPage } from '../event-detail/event-detail';
import { AngularFireAuth } from 'angularfire2/auth';
import { GroupOfGuestPage } from '../group-of-guest/group-of-guest';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { forEach } from '@firebase/util';
import { EventProvider } from "../../providers/event/event";
import { LoginPage } from '../login/login';



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

  public eventRef = this.db.database.ref('events');
  public userRef = this.db.database.ref('users');
  public eventExist: Array<any> = [];

  constructor(public db: AngularFireDatabase, public navCtrl: NavController,
    public modalCtrl: ModalController, public alertCtrl: AlertController,
    public afAuth: AngularFireAuth, public eventProvider: EventProvider
  ) {
        this.afAuth.authState.subscribe(user=>{
          if(user)
          {
            this.uid = this.afAuth.auth.currentUser.uid;
            this.items = db.list('events').valueChanges();
            this.itemsRef = db.list('events');
            this.items = this.itemsRef.snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
            
            
          }else{
            this.navCtrl.setRoot(LoginPage);
          }
        });
  }
  ionViewDidLoad() {
    this.afAuth.authState.subscribe(user=>{
      if(user)
      {
        this.initAllEvents();
      }
      
    });
   
  }

  addEvent() {
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
                  this.eventExist.push(data.val().name);
                }
                return false;
              });
            });
            if (data.eventName === undefined || data.eventName.trim() === '') {
              let alert = this.alertCtrl.create({
                title: 'Notice!!!',
                subTitle: "Please enter the event's name",
                buttons: ['Dismiss']
              });
              alert.present();
            }
            else {
              data.eventName = data.eventName.trim();
              if (data.eventName !== '' && this.eventExist.indexOf(data.eventName) === -1) {
                this.itemsRef.push({ name: data.eventName, uid: this.uid });
              }
              else if (data.eventName !== '' && this.eventExist.indexOf(data.eventName) !== -1) {
                let alert = this.alertCtrl.create({
                  title: 'Notice!!!',
                  subTitle: "Event's name has already existed. Please enter another name",
                  buttons: ['Dismiss']
                });
                alert.present();
              }
              else {
                let alert = this.alertCtrl.create({
                  title: 'Notice!!!',
                  subTitle: "Event's name must consist of 1 letter at least",
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
          }
        }
      ]
    });

    alert.present();

  }

  editEvent(item) {
    var eventName = item.name;
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
            if (data.trim !== '') {
              this.itemsRef.update(item.key, { name: data.name });
            }
          }
        }
      ]
    });
    alert.present();
  }

  openEventDetail(eventId) {
    this.navCtrl.push(EventDetailPage, eventId);
  }

  addGroupOfGuest(eventId) {
    this.navCtrl.push(GroupOfGuestPage, eventId);
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
}


