import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {HomePage} from '../home/home';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {apiServices} from '../../providers/apiServices'

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
    email:'',
    passWrd1:'',
    passWrd2:''
  }
  responseData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  displayAlert(alertTitle,alertSub){
    let theAlert = this.alertCtrl.create({
      title:alertTitle,
      subTitle:alertSub,
      buttons: ['ok']
    });
    theAlert.present();
  }
  registerAccount(){
    if (this.reg.passWrd1 != this.reg.passWrd2) {
      this.displayAlert('Error! Password Mismatch', 'Please Ensure the passwords match');
      this.reg.passWrd1 = '';
      this.reg.passWrd2 = '';
    }
    else{
      this.afAuth.auth.createUserWithEmailAndPassword(this.reg.email,this.reg.passWrd1)
        .then(res =>this.regSuccess(res))
        .catch(err => this.displayAlert('Error!',err));
    }
  }
  regSuccess(result){
    this.displayAlert(result.email,'Account created for this email address');
    this.afAuth.auth.signInWithEmailAndPassword(this.reg.email,this.reg.passWrd1)
      .then(res => this.navCtrl.push(HomePage))
      .catch(err => this.displayAlert('Error!',err));
  }
}
