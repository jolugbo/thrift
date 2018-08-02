import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {apiServices} from '../../providers/apiServices';

/**
 * Generated class for the SearchCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-customer',
  templateUrl: 'search-customer.html',
})
export class SearchCustomerPage {
  customerRecords: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiServices: apiServices) {
    this.customerRecordList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchCustomerPage');
  }
  performSearch(ev: any){
    const val = ev.target.value;
    this.apiServices.getCustomerById(val).then((result) => {
      this.customerRecords = result;
      console.log(this.customerRecords);
      if (!this.customerRecords.error) {
        console.log(this.customerRecords);
      }
    });
  }

  
  customerRecordList(){
    this.apiServices.getAllCustomers().then((result) => {
      this.customerRecords = result;
      console.log(this.customerRecords);
      if (!this.customerRecords.error) {
        console.log(this.customerRecords);
      }
    });
  }
}
