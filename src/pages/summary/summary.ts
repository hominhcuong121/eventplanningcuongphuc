import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskProvider } from '../../providers/task/task';
import { Chart } from 'chart.js';
import { GuestProvider } from '../../providers/guest/guest';
import { GroupProvider } from '../../providers/group/group';


/**
 * Generated class for the SummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {
  public taskSummary: Array<any>;
  public numberOfTasks: number = 0;
  public totalExpectedCost: number = 0;
  public totalActualCost: number = 0;

  public numberOfGuest: number = 0;
  public guestSummary: Array<any>;

  public numberOfGroup: number = 0;
  public groupSummary: Array<any>;
  public totalGiftMoneyPerGroup: number = 0;
  public totalGiftMoneyAllGroups: number = 0;
  public groupId: Array<any>;

  public eventId: string;

  @ViewChild('expectedCostBarCanvas') expectedCostBarCanvas;
  @ViewChild('actualCostBarCanvas') actualCostBarCanvas;

  public chartLabels: any = [];
  public chartExpectedCost: any = [];
  public chartActualCost: any = [];

  public expectedCostBarChart: any;
  public actualCostBarChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public taskProvider: TaskProvider, public guestProvider: GuestProvider,
              public groupProvider: GroupProvider) {
    this.eventId = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryPage');
    this.initAllTasks();
    this.initAllGuests();
    this.initAllGroups();
    this.defineActualCostBarChart();
    this.defineExpectedCostBarChart();
  }

  defineExpectedCostBarChart() {
    this.expectedCostBarChart = new Chart(this.expectedCostBarCanvas.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Expected Cost',
          data: this.chartExpectedCost,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  defineActualCostBarChart() {
    this.actualCostBarChart = new Chart(this.actualCostBarCanvas.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Actual Cost',
          data: this.chartActualCost,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  initAllTasks() {
    this.taskProvider.getTaskList().on('value', taskListSnapshot => {
      this.taskSummary = [];
      taskListSnapshot.forEach(snap => {
        if (snap.val().eventId === this.eventId) {
          this.taskSummary.push({
            key: snap.key,
            taskName: snap.val().taskName,
            eventId: snap.val().eventId,
            expectedCost: snap.val().expectedCost,
            actualCost: snap.val().actualCost
          });
          this.chartLabels.push(snap.val().taskName);
          this.chartActualCost.push(Number(snap.val().actualCost));
          this.chartExpectedCost.push(Number(snap.val().expectedCost));
          this.totalExpectedCost += Number(snap.val().expectedCost);
          this.totalActualCost += Number(snap.val().actualCost);
          return false;
        }
      });
      this.numberOfTasks = this.taskSummary.length;
    });
  }

  initAllGuests() {
    this.guestProvider.getGuestList().on('value', groupListSnapshot => {
      this.guestSummary = [];
      this.groupId = [];
      groupListSnapshot.forEach(snap => {
        if (snap.val().eventId === this.eventId) {
          this.guestSummary.push({
            key: snap.key,
            guestName: snap.val().guestName,
            eventId: snap.val().eventId,
            groupId: snap.val().groupId,
            giftMoney: snap.val().giftMoney
        });
        //check whether this group belongs to this event
        if(this.groupId.indexOf(snap.val().groupId) === -1) {
          this.groupId.push(snap.val().groupId);
        }
        this.totalGiftMoneyAllGroups += Number(snap.val().giftMoney);
        return false;
      }
    });
    this.numberOfGuest = this.guestSummary.length;
    });
  }

  initAllGroups() {
    this.groupProvider.getGroupList().on('value', groupListSnapshot => {
      this.groupSummary = [];
      groupListSnapshot.forEach(snap => {
        if (snap.val().eventId === this.eventId) {
          this.groupSummary.push({
            key: snap.key,
            groupName: snap.val().groupName,
            eventId: snap.val().eventId
          });
          return false;
        }
      });
      this.numberOfGroup = this.groupSummary.length;
    });
  }
}
