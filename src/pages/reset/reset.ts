import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {apiServices} from '../../providers/apiServices';
import{utilServices} from '../../providers/util';
import {LoginPage} from '../login/login';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the ResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public apiServices: apiServices,
              public utils:utilServices,public loadingCtrl:LoadingController) {
  }
resetData =
{
  email : '',
  userid:''
};
loading = this.loadingCtrl.create({
  content: 'Please wait...'
});
visibility1 = "hidden";
visibility2 = "hidden";
responseData:any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }
  resetPassword() {
    var loading = this.loadingCtrl.create({
       content: 'Please wait...'
     });
     loading.present();
    if(this.resetData.userid == ""){
      this.visibility1 = "visible";
      loading.dismiss();
      return;
    }
    if(this.resetData.email == ""){
      this.visibility2 = "visible";
      loading.dismiss();
      return;
    }
    console.log(this.resetData.email);
    
    this.apiServices.forgotPass(this.resetData).then((result) => {
      this.responseData = result;
      console.log(result);
       if (this.responseData.id) {
      //   this.userRecord = this.responseData;
      //   this.userRecord.token = this.generateToken();
      //   this.utils.localSave('AgentDetails', this.userRecord);
      //   this.apiServices.getAcctTypes().then((res) => {
      //     console.log(res);
      //     this.utils.localSave('AccountTypes', res);
      //   });
        loading.dismiss();
        this.utils.presentAlert('reset completed!', 'Please check your email for new password');
      //   this.navCtrl.setRoot(this.HomePage);
       }
       else {
        loading.dismiss();
      this.utils.presentAlert('reset error!', 'Please check your email for new password');
       }
    }, (err) => {
      loading.dismiss();
      this.utils.presentAlert('reset error!', err);
      console.error(err);
    })
  }
  signIn(){
    this.navCtrl.setRoot(LoginPage);
  }

}
