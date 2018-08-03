import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController } from 'ionic-angular';
import {apiServices} from '../../providers/apiServices';
import {utilServices} from '../../providers/util';


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
  customerRecords:any = [];
  customers:any = [];
  responseData:any = [];
  filterVar='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiServices: apiServices,
    private modal: ModalController,public utils:utilServices) {
    this.customerRecordList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchCustomerPage');
  }
  performSearch(ev: any){
   const val = ev.target.value;
   if (val.length <= 1){
        this.customerRecordList();
        return;
   }
    this.apiServices.getCustomerById(val).then((result) => {
      console.log(result)
      this.customerRecords = result;
      this.customers = this.customerRecords.customer;
      
      return this.customers;
    });
  }
  customerRecordList(){
    this.apiServices.getAllCustomers().then((result) => {
      this.customerRecords = result;
      this.customers = this.customerRecords.customers;
      console.log(this.customers);
      // if (!this.customerRecords.error) {
      //   console.log(this.customerRecords);
      // }
    });
  }
  fetchTransaction(id){
    this.apiServices.getCustomerTransactions(id).then((result) => {
      console.log(result);
      this.responseData = result;
      if(!this.responseData.error){
      const CustomerHistoryPage: Modal = this.modal.create("CustomerHistoryPage", { data: result });
      CustomerHistoryPage.present();
      }
      else{
        this.utils.presentAlert('info',this.responseData.message);
      }
  });
  }
}
