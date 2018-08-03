import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the CustomerHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-history',
  templateUrl: 'customer-history.html',
})
export class CustomerHistoryPage {

  customerHistoryResult:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerHistoryPage');
  }
  closeModalWthoutSlctn(){
    this.viewCtrl.dismiss();
  }

  closeModalWthSlctn(itemSelected){
    this.viewCtrl.dismiss(itemSelected);
  }
  
  ionViewWillLoad() {
    const customerHistoryResult = this.navParams.get('data');
    this.customerHistoryResult = customerHistoryResult;
    console.log(customerHistoryResult);
  }
}  
