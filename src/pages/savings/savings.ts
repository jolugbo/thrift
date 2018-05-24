import { Component } from '@angular/core';
import { apiServices } from '../../providers/apiServices';
import { utilServices } from '../../providers/util';
import { LoginPage } from '../../pages/login/login';


@Component({
    selector: 'page-savings',
    templateUrl: 'savings.html'
})
export class Savings {

    searchParam:any;
    responseData: any;
    saveRec = {
        customerId: '4',
        transAmount: '12000',
        accountId: '1',
        agentId: '',
    }
    constructor(public apiService: apiServices, public utils: utilServices) {
    }

    saveRecord() {
        console.log(this.saveRec);
        this.utils.localGet('AgentDetails').then((result) => {
            console.log(result);
            this.responseData = result;
            this.saveRec.agentId = this.responseData.agentId;
            this.apiService.savings(this.saveRec).then((result) =>{
                console.log(result);
            });
        });
    }
    searchRecord(){
        console.log(this.searchParam);
        this.apiService.searchRec(this.searchParam).then((result) =>{
            console.log(result);
        });
    }
}