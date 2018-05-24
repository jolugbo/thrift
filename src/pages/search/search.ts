import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchResult:any;
  constructor(public navCtrl: NavController, private navParams: NavParams,
              private viewCtrl:ViewController) {
  }
  closeModalWthoutSlctn(){
    this.viewCtrl.dismiss();
  }

  closeModalWthSlctn(itemSelected){
    this.viewCtrl.dismiss(itemSelected);
  }
  
  ionViewWillLoad() {
    const searchResult = this.navParams.get('data');
    this.searchResult = searchResult;
    console.log(searchResult);
  }

}
