import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditGuestPage } from './edit-guest';

@NgModule({
  declarations: [
    EditGuestPage,
  ],
  imports: [
    IonicPageModule.forChild(EditGuestPage),
  ],
})
export class EditGuestPageModule {}
