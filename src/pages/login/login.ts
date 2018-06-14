import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { apiServices } from '../../providers/apiServices';
import { utilServices } from '../../providers/util';
import { FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';


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
  loginForm: FormGroup;
  loginError: string;
  responseData: any;
  loginData = {
    email: '',
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiServices: apiServices,
    public utils: utilServices, public auth: AngularFireAuth) {
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
        this.utils.presentAlert('Login Successful!', '');
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
  register(email, password) {
    try {
      this.auth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        let user = this.auth.auth.currentUser;
        user.sendEmailVerification();
        this.utils.presentAlert('Email Verification sent.', '');
      })
    } catch (error) {
      this.utils.presentAlert('Error!', error.message);
    }
  }

  login() {
    let user = this.auth.auth.currentUser;
    try {
      if (user.emailVerified) {
        this.auth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password);
        this.utils.presentAlert('Login Successful!', '');
        this.navCtrl.setRoot(this.HomePage);
        console.log(user.email);
        console.log(user.displayName);
        console.log(user.emailVerified);
      } else {
        this.utils.presentAlert('Email not verified!', '');
        console.log(user.email);
        console.log(user.displayName);
        console.log(user.emailVerified);
      }
    } catch (error) {
      this.utils.presentAlert('Error!', error.message);
    }
  }   
  

    /* this.auth.auth.signInWithEmailAndPassword(email, password)
    .then(() => {
        this.navCtrl.setRoot(this.HomePage, { email })
        })
        .catch( error => {
          this.utils.presentAlert('Error!', error.message);;
      }) */
  }

