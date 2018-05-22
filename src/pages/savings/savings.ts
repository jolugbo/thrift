import {Component} from '@angular/core';
import {apiServices} from '../../providers/apiServices';
import {utilServices} from '../../providers/util';

@Component({
    selector: 'page-ssavings',
    templateUrl:'savings.html'
})
export class Savings{

    saveRec = {
        customerId :'',
        accountNo:'',
        transAmount:'',
        accountCode:'',
        agentId:'',
    }

    constructor(apiService:apiServices,utils:utilServices){

    }
}