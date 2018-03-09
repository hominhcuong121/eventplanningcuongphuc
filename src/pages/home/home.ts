import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email:string
  items: Observable<any[]>;
  constructor(public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public navCtrl: NavController,
  ) {
    this.items = db.list('users').valueChanges();
    this.email=this.afAuth.auth.currentUser.email;
  }
  

}


