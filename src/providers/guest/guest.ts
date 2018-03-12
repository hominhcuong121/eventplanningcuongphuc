import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';

/*
  Generated class for the GuestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GuestProvider {
  public guestListRef: Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.guestListRef = firebase
          .database()
          .ref(`/guests`);
      }
    });
  }

  getGuestList(): Reference {
    return this.guestListRef;
  }

}
