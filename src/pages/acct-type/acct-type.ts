import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the AcctTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-acct-type',
  templateUrl: 'acct-type.html',
})
export class AcctTypePage {
  AccountTypeResult:any;
  constructor(public navCtrl: NavController, private navParams: NavParams,
              private viewCtrl:ViewController) {
  }
  closeModalWthoutSlctn(){
    this.viewCtrl.dismiss();
  }

  closeModalWthSlctn(itemSelected){
    this.viewCtrl.dismiss(itemSelected);
  }
  
  ionViewWillLoad() {
    const AccountTypeResult = this.navParams.get('data');
    this.AccountTypeResult = AccountTypeResult;
    console.log(AccountTypeResult.accounts);
  }
}