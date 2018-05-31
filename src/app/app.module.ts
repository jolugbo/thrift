import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { Savings } from './../pages/savings/savings';
import { WithdrawalPage } from './../pages/withdrawal/withdrawal';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { HttpModule } from '@angular/http';
import { apiServices } from '../providers/apiServices';
import { utilServices } from '../providers/util';
import { IonicStorageModule } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';

export const firebaseConfig = {
  apiKey: "AIzaSyCiwQSBm2B9MvUCbh6LwoQiq-SfbEe54AQ",
  authDomain: "thrift-backend.firebaseapp.com",
  databaseURL: "http://thrift-backend.firebaseio.com",
  storageBucket: "thrift-backend.appspot.com",
  messagagingSenderID: '115674257881',
};
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    RegisterPage,
    WithdrawalPage,
    Savings
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule, HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    RegisterPage,
    WithdrawalPage,
    Savings
  ],
  providers: [
    StatusBar,
    SplashScreen,
    apiServices,
    utilServices,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
