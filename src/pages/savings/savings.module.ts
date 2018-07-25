import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Savings } from './savings';


@NgModule({
  declarations: [
    Savings,
  ],
  imports: [
    IonicPageModule.forChild(Savings),
  ],
})
export class SavingsModule {}
