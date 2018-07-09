import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {apiServices} from '../../providers/apiServices';
import{utilServices} from '../../providers/util';
import {LoginPage} from '../login/login';

/**
 * Generated class for the ResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public apiServices: apiServices,
              public utils:utilServices) {
  }
resetData =
{
  email : '',
  userid:''
};
responseData:any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }
  resetPassword() {
    console.log(this.resetData.email);
    
    this.apiServices.forgotPass(this.resetData).then((result) => {
      this.responseData = result;
      console.log(result);
      // if (this.responseData.id) {
      //   this.userRecord = this.responseData;
      //   this.userRecord.token = this.generateToken();
      //   this.utils.localSave('AgentDetails', this.userRecord);
      //   this.apiServices.getAcctTypes().then((res) => {
      //     console.log(res);
      //     this.utils.localSave('AccountTypes', res);
      //   });
       // this.utils.presentAlert('Login Successful!', 'Welcome ' + this.responseData.firstname);
      //   this.navCtrl.setRoot(this.HomePage);
      // }
      // else {
      //   this.utils.presentAlert('Login Error!', this.responseData.message);
      // }
    }, (err) => {
      console.error(err);
    })
  }
  signIn(){
    this.navCtrl.setRoot(LoginPage);
  }

}
