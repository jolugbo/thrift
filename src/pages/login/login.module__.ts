import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
//import { LoginPage } from './login';
import { HttpModule } from '@angular/http';
import {apiServices} from '../../providers/apiServices'

@NgModule({
  declarations: [
    //LoginPage,
  ],
  imports: [
   // IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
