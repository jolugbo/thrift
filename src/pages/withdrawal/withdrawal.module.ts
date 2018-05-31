import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WithdrawalPage } from './withdrawal';

@NgModule({
  declarations: [
    WithdrawalPage,
  ],
  imports: [
    IonicPageModule.forChild(WithdrawalPage),
  ],
})
export class WithdrawalPageModule {}
