import { RegisterPage } from './../register/register';
import { LoginPage } from './../login/login';
import { HomePage } from './../home/home';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, Platform } from 'ionic-angular';
 
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
  pages: Array<{title: string, component: any}>;
 
 
  constructor(public navCtrl: NavController,public platform: Platform) { 
     // used for an example of ngFor and navigation
     
     this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Customer Registration', component: RegisterPage },
      { title: 'Logout ', component: LoginPage }
    ];
  }
 
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
 
}

