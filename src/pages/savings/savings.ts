import { Component } from '@angular/core';
import { apiServices } from '../../providers/apiServices';
import { utilServices } from '../../providers/util';
import { Modal, ModalController } from 'ionic-angular';


@Component({
    selector: 'page-savings',
    templateUrl: 'savings.html'
})
export class Savings {

    searchParam: any;
    accountTypes: any;
    responseData: any;
    saveRec = {
        customerId: '',
        transAmount: '',
        accountId: '',
        agentId: '',
    }
    displayRec = {
        fullName: '',
        AccountType: '',
        BVN: '',
        AccountNumber: '',
        Lga: '',
        Gender: '',
    }
    constructor(private apiService: apiServices, private modal: ModalController,
        private utils: utilServices) {
            this.accountTypes = this.utils.localGet("AccountTypes");
            console.log(this.accountTypes);
            this.utils.localGet("AccountTypes").then((result)=>{
                this.accountTypes = result;
                console.log(this.apiService.acctType);
            });
    }
    setAcctTypes() {

    }
    saveRecord() {
        this.utils.localGet('AgentDetails').then((result) => {
            this.responseData = result;
            this.saveRec.agentId = this.responseData.id;
            this.apiService.savings(this.saveRec).then((result) => {
                this.responseData = result;
                console.log(result);
                this.utils.presentAlert('Success!',this.responseData.message);
                this.saveRec.customerId= "";this.saveRec.transAmount= "";this.saveRec.accountId= "";this.saveRec.agentId= "";
                this.displayRec.fullName= "";this.displayRec.AccountType= "";this.displayRec.BVN= "";this.displayRec.AccountNumber= "";this.displayRec.Lga= "";this.displayRec.Gender= "";
                
            });
        });
    }
    searchRecord() {
        this.apiService.searchRec(this.searchParam).then((result) => {
            const searchResultPage: Modal = this.modal.create('SearchPage', { data: result });
            searchResultPage.present();
            searchResultPage.onDidDismiss((data) => {
                if (data) {
                    console.log(data);
                    this.saveRec.customerId = data.id; //done
                    this.displayRec.fullName = data.firstName + " " + data.mname + " " + data.lastName;
                    //this.displayRec.AccountType = fetchAccoutType;
                    this.displayRec.BVN = data.BVN_num;
                    this.displayRec.AccountNumber = data.account_num;
                    this.displayRec.Lga = data.lga;
                    this.displayRec.Gender = data.gender;
                }
                else
                    this.utils.presentAlert("No Data","No User Selected");
            });
        });
    }
    DisplayAcctType(){
      this.apiService.getAcctTypesById(this.saveRec.customerId).then((res) => {
            console.log(res);
            const AccountTypesPage: Modal = this.modal.create("AcctTypePage", { data: res });
            AccountTypesPage.present();
            AccountTypesPage.onDidDismiss((data) => {
                if (data) {
                    this.saveRec.accountId = data.sn;
                    this.displayRec.AccountType = data.account_name;
                    this.displayRec.AccountNumber=  data.account_num
                }
                else
                this.utils.presentAlert("No Data","No Account Type Selected");
            });
          });
          /*
           this.utils.localGet("AccountTypes").then((result) => {
            const AccountTypesPage: Modal = this.modal.create("AcctTypePage", { data: result });
            AccountTypesPage.present();
            AccountTypesPage.onDidDismiss((data) => {
                if (data) {
                    this.saveRec.accountId = data.sn;
                    this.displayRec.AccountType = data.account_name;
                }
                else
                this.utils.presentAlert("No Data","No Account Type Selected");
            });
        });*/
    }
}