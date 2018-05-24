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
        console.log(this.saveRec);
        this.utils.localGet('AgentDetails').then((result) => {
            this.responseData = result;
            this.saveRec.agentId = this.responseData.agentId;
            this.apiService.savings(this.saveRec).then((result) => {
                console.log(result);
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
                    this.saveRec.customerId = data.sn; //done
                    this.displayRec.fullName = data.firstName + " " + data.mname + " " + data.lastName;
                    //this.displayRec.AccountType = fetchAccoutType;
                    this.displayRec.BVN = data.BVN_num;
                    this.displayRec.AccountNumber = data.account_num;
                    this.displayRec.Lga = data.lga;
                    this.displayRec.Gender = data.gender;
                }
                else
                    this.utils.presentAlert("No Data","No Record for search");
            });
        });
    }
    DisplayAcctType(){
        this.utils.localGet("AccountTypes").then((result) => {
            const AccountTypesPage: Modal = this.modal.create("AcctTypePage", { data: result });
            AccountTypesPage.present();
            AccountTypesPage.onDidDismiss((data) => {
                if (data) {
                    this.saveRec.accountId = data.sn;
                    this.displayRec.AccountType = data.account_name;
                }
                else
                this.utils.presentAlert("No Data","No Account Type Configured");
            });
        });
    }
}