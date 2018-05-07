import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menuData = [
    {title:'Our Menu', pic:'https://ionicframework.com/dist/preview-app/www/assets/img/nin-live.png',pushPage:'MenuPage'},
    {title:'Account', pic:'https://ionicframework.com/dist/preview-app/www/assets/img/badu-live.png',pushPage:'AccountPage'},
    {title:'About Us', pic:'https://ionicframework.com/dist/preview-app/www/assets/img/queen-live.png',pushPage:'AboutPage'},
    {title:'Locations', pic:'https://ionicframework.com/dist/preview-app/www/assets/img/rundmc-live.png',pushPage:'LocationPage'},
  ];
  logPage: any

  constructor(public navCtrl: NavController) {
    this.logPage= 'LoginPage';
  }

}
