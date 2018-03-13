import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { GroupProvider } from '../../providers/group/group';
import { AngularFireAuth } from 'angularfire2/auth';
import { AddGuestPage } from '../add-guest/add-guest';

/**
 * Generated class for the GroupOfGuestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-of-guest',
  templateUrl: 'group-of-guest.html',
})
export class GroupOfGuestPage {
  public filteredGroups: Array<any>;
  public numberOfAllGroups: number;

  public itemsRef: AngularFireList<any>;
  public items: Observable<any[]>;
  public eventId: string;

  public groupRef = this.db.database.ref('groups');
  public groupExist: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public db: AngularFireDatabase, public alertCtrl: AlertController,
              public groupProvider: GroupProvider, public afAuth: AngularFireAuth) {
    this.eventId = this.navParams.data;
    this.items = db.list('groups').valueChanges();
    this.itemsRef = db.list('groups');
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupOfGuestPage');
    this.initAllGroups();
  }

  addGroup(eventId) {
    let alert = this.alertCtrl.create({
      title: 'Add Group',
      message: "Please enter a group's name",
      inputs: [
        {
          name: 'groupName',
          placeholder: "group's name"
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
            this.groupRef.on('value', snapshot => {
              this.groupExist = [];
              snapshot.forEach(data => {
                if(data.val().eventId == this.eventId) {
                  this.groupExist.push(data.val().groupName);
                }
                return false;
              });
            });
            if(data.groupName === undefined || data.groupName === '') {
                let alert = this.alertCtrl.create({
                  title: 'Notice!!!',
                  subTitle: "Please enter the task's name",
                  buttons: ['Dismiss']
                  });
                alert.present();
              }
              else {
                data.groupName = data.groupName.trim();
                if(data.groupName !== '' && this.groupExist.indexOf(data.groupName) === -1){
                  this.itemsRef.push({groupName: data.groupName, eventId: eventId});
                  console.log(this.eventId);
                }
                else if (data.groupName !== '' && this.groupExist.indexOf(data.groupName) !== -1) {
                  let alert = this.alertCtrl.create({
                    title: 'Notice!!!',
                    subTitle: "Group's name has already existed. Please enter another name",
                    buttons: ['Dismiss']
                    });
                  alert.present();
                }
                else {
                  let alert = this.alertCtrl.create({
                    title: 'Notice!!!',
                    subTitle: "Group's name must consist of 1 letter at least",
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

  editGroup(item) {
    let alert = this.alertCtrl.create({
      title: 'Edit Group',
      inputs: [
        {
          name: "groupName",
          placeholder: "Enter your new group's name"
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
            if (data.groupName.trim() !== '') {
              this.itemsRef.update(item.key, { groupName: data.groupName });
            }
          }
        }
      ]
    });
    alert.present();
  }

  deleteGroup(item) {
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

  openAddGuestPage(groupId, EventId) {
    // console.log(groupId, this.eventId);
    this.navCtrl.push(AddGuestPage, {
      groupId: groupId,
      eventId: this.eventId
    });
  }

  initAllGroups() {
    this.groupProvider.getGroupList().on('value', groupListSnapshot => {
      this.filteredGroups = [];
      groupListSnapshot.forEach(snap => {
        if (snap.val().eventId === this.eventId) {
          this.filteredGroups.push({
            key: snap.key,
            groupName: snap.val().groupName,
            eventId: snap.val().eventId
          });
          return false;
        }
      });
      this.numberOfAllGroups = this.filteredGroups.length;
    });
  }

  filterItems(ev: any) {
    let val = ev.target.value;

    if (val === null || val.trim() === '') {
      this.initAllGroups();
    }

    if (val && val.trim() !== '') {
      this.groupProvider.getGroupList().on('value', groupListSnapshot => {
        let allGroups = [];
        groupListSnapshot.forEach(snap => {
          if (snap.val().eventId === this.eventId) {
            allGroups.push({
              key: snap.key,
              groupName: snap.val().groupName,
              eventId: snap.val().eventId
            });
            return false;
          }
        });

        this.filteredGroups = allGroups.filter(e => e.groupName.toLowerCase().includes(val.toLowerCase()));
      });
    }
  }

}
