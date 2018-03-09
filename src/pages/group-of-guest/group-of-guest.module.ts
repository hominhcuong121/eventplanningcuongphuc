import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupOfGuestPage } from './group-of-guest';

@NgModule({
  declarations: [
    GroupOfGuestPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupOfGuestPage),
  ],
})
export class GroupOfGuestPageModule {}
