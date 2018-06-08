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
  viewType:string = "Personal";
  fiveSavingsTransactions: any;
public doughnutChartLabel: string[] = ["Mine","Group"];
public doughnutChartData: number[] = [20,80];
public doughnutChatType: string='pie';

public lineChartLabel: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"
//, "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
public lineChartData: object[] = [{ x: 0, y: 20 }, { x: 0, y: 30 }, { x: 0, y: 40 }, { x: 0, y: 10 }, { x: 0, y: 80 }, { x: 0, y: 10 }
  //,{ x: 0, y: 20 }, {x: 0, y: 30 }, { x: 0, y: 40 }, { x: 0, y: 10 }, { x: 0, y: 80 }, { x: 0, y: 10 }
];
public lineChatType: string = 'line';

  constructor(public navCtrl: NavController, private apiService: apiServices, private util: utilServices) {
    this.logPage = 'LoginPage';
    this.getAllSavings();
  }

  getAllSavings() {
    this.util.localGet('AgentDetails').then((response) => {
      let res: any = response;
      //console.log(res);
      this.apiService.getAllSavings(res.id).then((result) => {
        this.fiveSavingsTransactions = result;
      });
    });
  }

}
