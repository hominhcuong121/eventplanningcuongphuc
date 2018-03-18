import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { GuestProvider } from '../../providers/guest/guest';

/**
 * Generated class for the AddGuestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-guest',
  templateUrl: 'add-guest.html',
})
export class AddGuestPage {
  public filteredGuests: Array<any>;
  public numberOfAllGuests: number;

  public itemsRef: AngularFireList<any>;
  public items: Observable<any[]>;
  public groupId: string;
  public eventId: string;
  public groupName: string;

  public guestRef = this.db.database.ref('guests');
  public guestExist: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public db: AngularFireDatabase, public alertCtrl: AlertController,
              public guestProvider: GuestProvider) {
    this.items = db.list('guests').valueChanges();
    this.itemsRef = db.list('guests');
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.groupId = this.navParams.get('groupId');
    this.eventId = this.navParams.get('eventId');
    this.groupName = this.navParams.get('groupName');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGuestPage');
    this.initAllGuests();  //reload exist's guest after searching
  }

  addGuest(groupId, eventId) {
    let alert = this.alertCtrl.create({
      title: 'Add Guest',
      message: "Please enter a guest's name",
      inputs: [
        {
          name: 'guestName',
          placeholder: "guest's name"
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
            this.guestRef.on('value', snapshot => {
              this.guestExist = [];
              snapshot.forEach(data => {
                if (data.val().groupId == this.groupId) {
                  this.guestExist.push(data.val().guestName.toLowerCase());
                }
                return false;
              });
            });
            if (data.guestName === undefined || data.guestName.trim() === '') {
              let alert = this.alertCtrl.create({
                title: "Failed...",
                subTitle: "Event's name cannot be empty",
                buttons: ['Dismiss']
              });
              alert.present();
            }
            else {
              var guestName = data.guestName.trim().toLowerCase();
              if (this.guestExist.indexOf(guestName) === -1) {
                this.itemsRef.push({
                  guestName: guestName, eventId: this.eventId,
                  groupId: this.groupId, giftMoney: 0
                });
              }
              else {
                let alert = this.alertCtrl.create({
                  title: 'Notice!!!',
                  subTitle: "Guest's name has already existed. Please enter another name",
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

  editGuest(item) {
    let alert = this.alertCtrl.create({
      title: 'Edit Guest',
      inputs: [
        {
          name: "guestName",
          placeholder: "Enter your new guest's name"
        },
        {
          name: "giftMoney",
          placeholder: "Enter your new guest's gift money",
          type: 'number'
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
            if (data.giftMoney === '') {
              data.giftMoney = item.giftMoney;
            }
            var guestName = data.guestName.trim().toLowerCase();
            if (guestName === '') {
              guestName = item.guestName;
            }
            else {
              if (this.guestExist.indexOf(guestName) === -1) {
                this.itemsRef.update(item.key, { guestName: guestName, giftMoney: data.giftMoney });
              }
              else {
                let alert = this.alertCtrl.create({
                  title: 'Notice!!!',
                  subTitle: "Guest's name has already existed. Please enter another name",
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

  deleteGuest(item) {
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

  initAllGuests() {
    this.guestProvider.getGuestList().on('value', groupListSnapshot => {
      this.filteredGuests = [];
      groupListSnapshot.forEach(snap => {
        if (snap.val().groupId === this.groupId) {
          this.filteredGuests.push({
            key: snap.key,
            guestName: snap.val().guestName,
            eventId: snap.val().eventId,
            groupId: snap.val().groupId,
            giftMoney: snap.val().giftMoney
          });
          return false;
        }
      });
      this.numberOfAllGuests = this.filteredGuests.length;
    });
  }

  filterItems(ev: any) {
    let val = ev.target.value;

    if (val === null || val.trim() === '') {
      this.initAllGuests();
    }

    if (val && val.trim() !== '') {
      this.guestProvider.getGuestList().on('value', guestListSnapshot => {
        let allGuests = [];
        guestListSnapshot.forEach(snap => {
          if (snap.val().groupId === this.groupId) {
            allGuests.push({
              key: snap.key,
              guestName: snap.val().guestName,
              eventId: snap.val().eventId,
              groupId: snap.val().groupId,
              giftMoney: snap.val().giftMoney
            });
            return false;
          }
        });

        this.filteredGuests = allGuests.filter(e => e.guestName.toLowerCase().includes(val.toLowerCase()));
      });
    }
  }

}
