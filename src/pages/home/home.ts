import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { EditEventPage } from '../edit-event/edit-event';
import { EventDetailPage } from '../event-detail/event-detail';
import { AngularFireAuth } from 'angularfire2/auth';
import { GroupOfGuestPage } from '../group-of-guest/group-of-guest';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { forEach } from '@firebase/util';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  uid:string;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  public eventRef = this.db.database.ref('events');
  public userRef = this.db.database.ref('users');
  public eventExist: Array<any> = [];
  public firstLogin: boolean = false;

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

    // //First Login
    // this.userRef.on('value', snapshot => {
    //   snapshot.forEach(data => {
    //     if(data.key == this.uid && data.val().firstLogin === true) {
    //       let alert = this.alertCtrl.create({
    //         title: 'Instruction',
    //         subTitle: 'Please sliding an event from left to right for more options!',
    //         buttons: ['OK']
    //       });
    //       alert.present();
    //     }
    //     return false;
    //   });
    // });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage'); 
  }

  addEvent() {
    let alert = this.alertCtrl.create({
      title: 'Add Event',
      message: "Please enter an event's name",
      inputs: [
        {
          name: 'eventName',
          placeholder: 'Title'
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
                if(data.val().uid == this.uid) {
                  this.eventExist.push(data.val().name);
                }
                return false;
              });
            });
            if(data.eventName === undefined || data.eventName === '') {
                let alert = this.alertCtrl.create({
                  title: 'Notice!!!',
                  subTitle: "Please enter the event's name",
                  buttons: ['Dismiss']
                  });
                alert.present();
              }
              else {
                data.eventName = data.eventName.trim();
                if(data.eventName !== '' && this.eventExist.indexOf(data.eventName) === -1){
                  this.itemsRef.push({name: data.eventName, uid: this.uid});
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
  }

  addGroupOfGuest(eventId) {
    this.navCtrl.push(GroupOfGuestPage, eventId);
  }

  // filterItems(ev: any){
  //   let val = ev.target.value;
  //   if(val && val.trim() !== '') {
  //     this.items = this.items.filter(function(item){
  //       return item.to
  //     });
  //   }
  // }

}


