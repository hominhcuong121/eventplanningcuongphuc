import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { EditEventPage } from '../edit-event/edit-event';
import { EventDetailPage } from '../event-detail/event-detail';
import { AngularFireAuth } from 'angularfire2/auth';
import { GroupOfGuestPage } from '../group-of-guest/group-of-guest';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {EventProvider} from '../../providers/event/event';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  public eventList:Array<any>;
  public loadedeventList:Array<any>;
  public eventRef:firebase.database.Reference;

  uid:string;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  
  constructor(public db: AngularFireDatabase, public navCtrl: NavController, 
              public alertCtrl: AlertController,
              public afAuth:AngularFireAuth
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
                  this.eventRef = firebase.database().ref('/events');
              
                  this.eventRef.on('value', eventList => {
                    let events = [];
                    eventList.forEach( event => {
                      if(event.val().uid==this.afAuth.auth.currentUser.uid)
                      {
                        events.push(event.val());
                        return false;
                      }
                      
                    });
            
                    this.eventList = events;
                    this.loadedeventList = events;
                  });
                  
                }else{
                  this.navCtrl.setRoot(LoginPage);
                }
              });
             
    
  }
  initializeItems(){
    this.eventList = this.loadedeventList;
    
  }
  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
    
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
   
      this.eventList = this.eventList.filter((v) => {
        if(v.name && q && v.uid==this.afAuth.auth.currentUser.uid) {
          if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
           
            return true;
           
          }
          return false;
        }
      });
      console.log(this.eventList);
    console.log(q, this.eventList.length);

  }







  ionViewDidLoad() {
   
   
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
/*findEvent(eventName:string){
  var ref = firebase.database().ref("events");
  
  ref.on("value", function(snapshot) {
   if(snapshot.val().name=="cuong")
   {
     console.log('trung');
     return;

   }
  });
  
}*/

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
logout(){
  this.afAuth.auth.signOut();
  

  
}
}


