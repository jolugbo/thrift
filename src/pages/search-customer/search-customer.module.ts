import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchCustomerPage } from './search-customer';

@NgModule({
  declarations: [
    SearchCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchCustomerPage),
  ],
})
export class SearchCustomerPageModule {}
