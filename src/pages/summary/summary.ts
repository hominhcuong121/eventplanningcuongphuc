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
  public numberOftable: number = 0;

  public numberOfGuest: number = 0;
  public guestSummary: Array<any>;

  public numberOfGroup: number = 0;
  public groupSummary: Array<any>;
  public totalGiftMoneyAllGroups: number = 0;
  public groupId: Array<any>;
  public infoForEachgroup: Array<any> = [];

  public eventId: string;

  @ViewChild('BarCanvas') BarCanvas;
  public chartLabels: any = [];
  public chartExpectedCost: any = [];
  public chartActualCost: any = [];
  public BarChart: any;

  @ViewChild('giftMoenyPieCanvas') giftMoenyPieCanvas;
  public pieChartLabels: any = [];
  public pieChartGiftMoney: any = [];
  public pieChartColors: any = [];
  public giftMoneyPieChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public taskProvider: TaskProvider, public guestProvider: GuestProvider,
    public groupProvider: GroupProvider) {
    this.eventId = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryPage');
    this.initAllTasks();
    this.initAllGroups();
    this.initAllGuests();
    this.defineBarChart();
    this.definePieChart();
  }

  definePieChart() {
    this.giftMoneyPieChart = new Chart(this.giftMoenyPieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: this.pieChartLabels,
        datasets: [
          {
            label: 'hihi',
            data: this.pieChartGiftMoney,
            duration: 2000,
            easing: 'easeInQuart',
            backgroundColor: this.pieChartColors
          }
        ],
        options: {
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 50,
              right: 0,
              top: 0,
              bottom: 0
            },
          },
          animation: {
            duration: 5000
          }
        }
      }
    });
  }

  defineBarChart() {
    this.BarChart = new Chart(this.BarCanvas.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Expected Cost',
            data: this.chartExpectedCost,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
          },
          {
            label: 'Actual Cost',
            data: this.chartActualCost,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }
        ]
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
          if (this.groupId.indexOf(snap.val().groupId) === -1) {
            this.groupId.push(snap.val().groupId);
          }
          this.totalGiftMoneyAllGroups += Number(snap.val().giftMoney);
          return false;
        }
      });
      //calculate gift money and number of guest for each group
      this.groupSummary.forEach(groupSnap => {
        var giftMoney = 0;
        var guestCount = 0;
        for (var i = 0; i < this.guestSummary.length; i++) {
          if (groupSnap.key === this.guestSummary[i].groupId) {
            giftMoney += Number(this.guestSummary[i].giftMoney);
            guestCount++;
          }
        }
        for (var i = 0; i < this.groupSummary.length; i++) {
          if (groupSnap.key === this.groupSummary[i].key) {
            this.infoForEachgroup.push({
              groupName: this.groupSummary[i].groupName,
              giftMoney: giftMoney,
              guestCount: guestCount
            });
            this.pieChartLabels.push(this.groupSummary[i].groupName);
            this.pieChartGiftMoney.push(giftMoney);
            var hex = "0123456789ABCDEF", color = "#";
            for (var i = 1; i <= 6; i++) {
              color += hex[Math.floor(Math.random() * 16)];
            }
            this.pieChartColors.push(color);
            break;
          }
        }
      });
      this.numberOfGuest = this.guestSummary.length;
      this.numberOftable = Math.floor(this.numberOfGuest / 10) + 1;
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
