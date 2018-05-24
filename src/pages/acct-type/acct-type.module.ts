import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcctTypePage } from './acct-type';

@NgModule({
  declarations: [
    AcctTypePage,
  ],
  imports: [
    IonicPageModule.forChild(AcctTypePage),
  ],
})
export class AcctTypePageModule {}
