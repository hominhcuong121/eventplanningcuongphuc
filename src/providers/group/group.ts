import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';

/*
  Generated class for the GroupProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroupProvider {
  public groupListRef: Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.groupListRef = firebase
          .database()
          .ref(`/groups`);
      }
    });
  }

  getGroupList(): Reference {
    return this.groupListRef;
  }

}
