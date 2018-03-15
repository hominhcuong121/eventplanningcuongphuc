import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { TaskProvider } from '../../providers/task/task';

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
  public filteredTasks: Array<any>;
  public numberOfAllTasks: number;

  public itemsRef: AngularFireList<any>;
  public items: Observable<any[]>;
  public eventId: string;
  public uid: string;

  public taskRef = this.db.database.ref('tasks');
  public taskExist: Array<any> = [];

  constructor(public db: AngularFireDatabase, public navCtrl: NavController,
    public modalCtrl: ModalController, public navParams: NavParams,
    public alertCtrl: AlertController, public afAuth: AngularFireAuth,
    public taskProvider: TaskProvider) {
    this.uid = this.afAuth.auth.currentUser.uid;
    this.eventId = this.navParams.data;
    this.items = db.list('tasks').valueChanges();
    this.itemsRef = db.list('tasks');
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
    this.initAllTasks();
  }

  addTask(eventId) {
    let alert = this.alertCtrl.create({
      title: 'Add Event',
      message: "Please enter a task's name",
      inputs: [
        {
          name: 'taskName',
          placeholder: "task's name"
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
            this.taskRef.on('value', snapshot => {
              this.taskExist = [];
              snapshot.forEach(data => {
                if (data.val().eventId == this.eventId) {
                  this.taskExist.push(data.val().taskName.toLowerCase());
                }
                return false;
              });
            });
            if (data.taskName === undefined || data.taskName.trim() === '') {
              let alert = this.alertCtrl.create({
                title: "Failed...",
                subTitle: "Event's name cannot be empty",
                buttons: ['Dismiss']
              });
              alert.present();
            }
            else {
              var taskName = data.taskName.trim().toLowerCase();
              if (this.taskExist.indexOf(taskName) === -1) {
                this.itemsRef.push({ taskName: taskName, eventId: this.eventId, expectedCost: 0, actualCost: 0 });
                console.log(this.taskExist);
              }
              else {
                let alert = this.alertCtrl.create({
                  title: 'Notice!!!',
                  subTitle: "Task's name has already existed. Please enter another name",
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

  editTask(item) {
    let alert = this.alertCtrl.create({
      title: 'Edit Task',
      inputs: [
        {
          name: "taskName",
          placeholder: "Enter your new task's name"
        },
        {
          name: "expectedCost",
          placeholder: "Enter your task's expected cost",
          type: 'number'
        },
        {
          name: "actualCost",
          placeholder: "Enter your new task's actual cost",
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
            if (data.expectedCost === '') {
              data.expectedCost = item.expectedCost;
            }
            if (data.actualCost === '') {
              data.actualCost = item.actualCost
            }
            var taskName = data.taskName.trim().toLowerCase();
            if (taskName === '') {
              this.itemsRef.update(item.key, { taskName: taskName, 
                                    expectedCost: data.expectedCost, actualCost: data.actualCost });
            }
            else {
              if (this.taskExist.indexOf(taskName) === -1) {
                this.itemsRef.update(item.key, { taskName: taskName, 
                                      expectedCost: data.expectedCost, actualCost: data.actualCost });
              }
              else {
                let alert = this.alertCtrl.create({
                  title: 'Notice!!!',
                  subTitle: "Task's name has already existed. Please enter another name",
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

  initAllTasks() {
    this.taskProvider.getTaskList().on('value', taskListSnapshot => {
      this.filteredTasks = [];
      taskListSnapshot.forEach(snap => {
        if (snap.val().eventId === this.eventId) {
          this.filteredTasks.push({
            key: snap.key,
            taskName: snap.val().taskName,
            eventId: snap.val().eventId,
            expectedCost: snap.val().expectedCost,
            actualCost: snap.val().actualCost
          });
          return false;
        }
      });
      this.numberOfAllTasks = this.filteredTasks.length;
    });
  }

  filterItems(ev: any) {
    let val = ev.target.value;

    if (val === null || val.trim() === '') {
      this.initAllTasks();
    }

    if (val && val.trim() !== '') {
      this.taskProvider.getTaskList().on('value', taskListSnapshot => {
        let allTasks = [];
        taskListSnapshot.forEach(snap => {
          if (snap.val().eventId === this.eventId) {
            allTasks.push({
              key: snap.key,
              taskName: snap.val().taskName,
              eventId: snap.val().eventId,
              expectedCost: snap.val().expectedCost,
              actualCost: snap.val().actualCost
            });
            return false;
          }
        });

        this.filteredTasks = allTasks.filter(e => e.taskName.toLowerCase().includes(val.toLowerCase()));
      });
    }
  }

}
