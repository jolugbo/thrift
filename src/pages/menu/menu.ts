import { RegisterPage } from './../register/register';
import { LoginPage } from './../login/login';
import { HomePage } from './../home/home';
import { Savings } from '../savings/savings';
import { WithdrawalPage } from '../withdrawal/withdrawal';
import { SearchCustomerPage } from '../search-customer/search-customer';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { utilServices } from '../../providers/util';

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
  pages: Array<{ title: string, component: any }>;


  constructor(public navCtrl: NavController,private storage: Storage,
    public utils: utilServices, public platform: Platform) {
    // used for an example of ngFor and navigation

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Register', component: RegisterPage },
      { title: 'Savings', component: Savings },
      { title: 'Withdrawals', component: WithdrawalPage },
      { title: 'Customers', component: SearchCustomerPage },
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout() {
    this.utils.localSave('AgentDetails', null);
    this.nav.setRoot(LoginPage);
  }
}

