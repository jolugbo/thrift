import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { apiServices } from '../../providers/apiServices';
import { utilServices } from '../../providers/util';
import { ResetPage } from '../reset/reset';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData: any;
  loginData = {
    agentid: '',
    password: ''
  }
  userRecord = {
    id: '',
    email: '',
    default: '',
    firstname: '',
    agentid: '',
    token: ''
  }
  regPage: any;
  HomePage: any;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
    public navParams: NavParams, public apiServices: apiServices,
    public utils: utilServices) {
    this.regPage = 'RegisterPage';
    this.HomePage = 'MenuPage';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  signIn() {
    console.log(this.loginData);
    
    this.apiServices.loginUser(this.loginData, 'agent/login').then((result) => {
      this.responseData = result;
      console.log(result);
      if (this.responseData.id) {
        this.userRecord = this.responseData;
        this.userRecord.token = this.generateToken();
        this.utils.localSave('AgentDetails', this.userRecord);
        this.apiServices.getAcctTypes().then((res) => {
          console.log(res);
          this.utils.localSave('AccountTypes', res);
        });
        this.utils.presentAlert('Login Successful!', 'Welcome ' + this.responseData.firstname);
        this.navCtrl.setRoot(this.HomePage);
      }
      else {
        this.utils.presentAlert('Login Error!', this.responseData.message);
      }
    }, (err) => {
      console.error(err);
    })
  }
  generateToken() {
    let rd = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16).substring(1);
    }
    return rd() + rd() + '-' + rd() + '-' + rd() + '-' + rd() + '-' + rd() + rd() + rd()

  }
  passwordReset(){
    this.navCtrl.setRoot(ResetPage);
  }

}
