import { RegisterPage } from './../register/register';
import { LoginPage } from './../login/login';
import { HomePage } from './../home/home';
import { Savings } from '../savings/savings';
import { WithdrawalPage } from '../withdrawal/withdrawal';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  // Basic root for our content view


  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  logOutPage: any = LoginPage;
  pages: Array<{ title: string, component: any }>;


  constructor(public navCtrl: NavController, public platform: Platform, public AngAuth: AngularFireAuth) {
    // used for an example of ngFor and navigation

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Customer Registration', component: RegisterPage },
      { title: 'Customer Savings', component: Savings },
      { title: 'Customer Withdrawals', component: WithdrawalPage },
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout(){
    console.log('logout');
    this.AngAuth.auth.signOut;
    this.navCtrl.setRoot(this.logOutPage)
    }

}

