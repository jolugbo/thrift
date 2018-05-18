import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {HomePage} from '../home/home';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {apiServices} from '../../providers/apiServices';
import {utilServices} from '../../providers/util';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  reg = {
    pics:'',
    phone:'',
    account_num:'',
    bvn:'',
    fname:'',
    lname:'',
    mname:'',
    email:'',
    address:'',
    city:'',
    state:'',
    dob:'',
    gender:'',
    lga:'',
  }

  responseData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController,public utils:utilServices, 
              private afAuth: AngularFireAuth,private apiServices:apiServices) {
                this.getAccTypes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  lunchCam(){
    this.utils.cameraAction();
  }
  displayAlert(alertTitle,alertSub){
    let theAlert = this.alertCtrl.create({
      title:alertTitle,
      subTitle:alertSub,
      buttons: ['ok']
    });
    theAlert.present();
  }
  getAccTypes(){
    this.apiServices.getAcctTypes().then((result) => {
      this.responseData = result;
      if (!this.responseData.error) {
        console.log(this.responseData);
      }
    });
  }

  registerAccount(){
    this.apiServices.loginUser(this.reg, 'customer/register').then((result) => {
      this.responseData = result;
      if (!this.responseData.error) {
        console.log(this.responseData);
        // this.userRecord = this.responseData;
        // this.userRecord.token = this.generateToken();
         this.utils.localSave(this.reg);
         this.utils.presentAlert('Success!',this.responseData.message);
         this. reg = {pics:'',phone:'',account_num:'',bvn:'',fname:'',lname:'',mname:'',email:'',address:'',city:'',state:'',dob:'',gender:'', lga:''};
        // this.navCtrl.setRoot(this.HomePage); 
      }
      else {
        //this.utils.presentAlert('Login Error!',this.responseData.message);
      }
    }, (err) => {
      console.error(err);
    })
  }
  regSuccess(result){
    // this.displayAlert(result.email,'Account created for this email address');
    // this.afAuth.auth.signInWithEmailAndPassword(this.reg.email,this.reg.passWrd1)
    //   .then(res => this.navCtrl.push(HomePage))
    //   .catch(err => this.displayAlert('Error!',err));
  }
  
}
