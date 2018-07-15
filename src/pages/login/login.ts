import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { apiServices } from '../../providers/apiServices';
import { utilServices } from '../../providers/util';
import { ResetPage } from '../reset/reset';
import { Storage } from '@ionic/storage';
import { IntroPage } from '../intro/intro';
import { LoadingController } from 'ionic-angular';

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
  visibility1 = "hidden";
  visibility2 = "hidden";
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

  loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
    public navParams: NavParams, public apiServices: apiServices,private storage: Storage,
    public utils: utilServices,public loadingCtrl:LoadingController) {
    this.regPage = 'RegisterPage';
    this.HomePage = 'MenuPage';
  }

  ionViewDidLoad() {
    this.storage.get('intro-done').then(done => {
      if (!done) {
        //this.storage.set('intro-done', true);
        this.navCtrl.setRoot(IntroPage);
      }
    });
  }
  signIn() {
   var loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if(this.loginData.agentid == ""){
      loading.dismiss();
      this.visibility1 = "visible";
      return;
    }
    if(this.loginData.password == ""){
      loading.dismiss();
      this.visibility2 = "visible";
      return;
    }
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
        loading.dismiss();
        this.utils.presentAlert('Login Successful!', 'Welcome ' + this.responseData.firstname);
        this.navCtrl.setRoot(this.HomePage);
      }
      else {
        loading.dismiss();
        this.utils.presentAlert('Login Error!', this.responseData.message);
      }
    }, (err) => {
      loading.dismiss();
      this.utils.presentAlert('Login Error!', err);
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
  passwordReset() {
    this.navCtrl.setRoot(ResetPage);
  }

}
