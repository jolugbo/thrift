import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { apiServices } from '../../providers/apiServices';
import { utilServices } from '../../providers/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menuData = [
    { title: 'Our Menu', pic: 'https://ionicframework.com/dist/preview-app/www/assets/img/nin-live.png', pushPage: 'MenuPage' },
    { title: 'Account', pic: 'https://ionicframework.com/dist/preview-app/www/assets/img/badu-live.png', pushPage: 'AccountPage' },
    { title: 'About Us', pic: 'https://ionicframework.com/dist/preview-app/www/assets/img/queen-live.png', pushPage: 'AboutPage' },
    { title: 'Locations', pic: 'https://ionicframework.com/dist/preview-app/www/assets/img/rundmc-live.png', pushPage: 'LocationPage' },
  ];
  logPage: any

  constructor(public navCtrl: NavController, private apiService: apiServices, private util: utilServices) {
    this.logPage = 'LoginPage';
    this.getAllSavings();
  }

  getAllSavings() {
    this.util.localGet('AgentDetails').then((response) => {
      let res: any = response;
      console.log(res);
      this.apiService.getAllSavings(res.id).then((result) => {
        console.log(result);
      });
    });
  }

}
