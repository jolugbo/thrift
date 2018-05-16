import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MenuPage} from '../menu/menu';
import {apiServices} from '../../providers/apiServices';

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
  userRecord = {
    agentid:'',
    password:''
  }
   regPage: any;
   MenuPage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiServices: apiServices) {
    this.regPage = 'RegisterPage';
    this.MenuPage = 'MenuPage';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  signIn(){
   /* this.apiServices.loginUser(this.userRecord,'agent/login').then((result)=>{
      this.responseData = result;
      if(this.responseData.userRecord){
        console.log(this.responseData);
        //this.navCtrl.setRoot(this.regPage);
      }
      else{
        console.log("invalid user");
      }
    },(err) =>{
      console.error(err);
    })*/
    this.navCtrl.setRoot(this.MenuPage);
  }
}
