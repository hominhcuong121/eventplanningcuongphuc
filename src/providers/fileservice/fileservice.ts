import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Upload} from '../../models/upload';
//import * as firebase from 'firebase/app';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
/*
  Generated class for the FileserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FileserviceProvider {

 
  public uid: string;
  public usersRef: AngularFireList<any>;
  public users: Observable<any[]>;

  
  constructor( private db: AngularFireDatabase,public afAuth:AngularFireAuth) {
    this.afAuth.authState.subscribe(user=>{
      if(user)
      {
        this.uid = this.afAuth.auth.currentUser.uid;
        this.users = db.list('users').valueChanges();
        this.usersRef = db.list('users');
        this.users = this.usersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

   }
  });
}
  basePath:string = '/uploads';
  uploadsRef: AngularFireList<Upload>;
  uploads: Observable<Upload[]>;

  pushUpload(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(this.basePath+ '/' + upload.file.name).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
        // upload in progress
        const snap = snapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        if (uploadTask.snapshot.downloadURL) {
          upload.url = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          this.saveFileData(upload);
          return;
        } else {
          console.error('No download URL!');
        }
      },
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    if(this.uid)
    {
      this.usersRef.update(this.uid, { photoUrl: upload.url });
    }
   
  }
  
}
