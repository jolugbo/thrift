import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController , ActionSheetController, ToastController,Modal, Platform, LoadingController, Loading, ModalController} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {apiServices} from '../../providers/apiServices';
import {utilServices} from '../../providers/util';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { FormBuilder,FormGroup,Validators,AbstractControl } from '@angular/forms';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
 
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  formgroup:FormGroup;
  lastImage: string = null;
  loading: Loading;
  regValidator ={
    fname:'visible',//hidden
    phone:'visible',
    bvn:'visible',
    lname:'visible',
    address:'visible',
    lga:'visible',
    state:'visible',
    dob:'visible',
    accounttype:'visible',
  }
  displayRec={
    AccountType :''
  }
  reg = {
    pics:'',phone:'',bvn:'',fname:'',accounttype:'',lname:'',mname:'',email:'',address:'',city:'',state:'',dob:'',gender:'',lga:'',
  }
  responseData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController,
              public alertCtrl: AlertController,public utils:utilServices, 
              private afAuth: AngularFireAuth,private apiServices:apiServices,
              private camera:Camera,public loadingCtrl:LoadingController, 
              private transfer: Transfer, private file: File, private filePath: FilePath, 
              public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, 
              public platform: Platform) {
                this.getAccTypes();
  }

  validate(ev) {
    //console.log(ev.target.value);
    if (ev.srcElement.name === "fname") {
      if (ev.target.value.length <  1) {
        this.regValidator.fname = "visible";
      }
      else{
        this.regValidator.fname = "hidden";
      }
    }
    else if(ev.srcElement.name == 'lname'){
      if (ev.target.value.length <  1) {
        this.regValidator.lname = "visible";
      }
      else{
        this.regValidator.lname = "hidden";
      }
    }
    else if(ev.srcElement.name == 'phone'){
      if (ev.target.value.length <  1) {
        this.regValidator.phone = "visible";
      }
      else{
        this.regValidator.phone = "hidden";
      }
    }
    else if(ev.srcElement.name == 'bvn'){
      if (ev.target.value.length <  1) {
        this.regValidator.bvn = "visible";
      }
      else{
        this.regValidator.bvn = "hidden";
      }
    }
    else if(ev.srcElement.name == 'accounttype'){
      if (ev.target.value.length <  1) {
        this.regValidator.accounttype = "visible";
      }
      else{
        this.regValidator.accounttype = "hidden";
      }
    }
    else if(ev.srcElement.name == 'address'){
      if (ev.target.value.length <  1) {
        this.regValidator.address = "visible";
      }
      else{
        this.regValidator.address = "hidden";
      }
    }
    else if(ev.srcElement.name == 'lga'){
      if (ev.target.value.length <  1) {
        this.regValidator.lga = "visible";
      }
      else{
        this.regValidator.lga = "hidden";
      }
    }
    else if(ev.srcElement.name == 'State'){
      if (ev.target.value.length <  1) {
        this.regValidator.state = "visible";
      }
      else{
        this.regValidator.state = "hidden";
      }
    }
    else if(ev.srcElement.name == 'State'){
      if (ev.target.value.length <  1) {
        this.regValidator.state = "visible";
      }
      else{
        this.regValidator.state = "hidden";
      }
    }
    else if(ev.srcElement.name == 'dob'){
      if (ev.target.value.length <  1) {
        this.regValidator.dob = "visible";
      }
      else{
        this.regValidator.dob = "hidden";
      }
    }
  }

  displayAlert(alertTitle,alertSub){
    let theAlert = this.alertCtrl.create({
      title:alertTitle,
      subTitle:alertSub,
      buttons: ['ok']
    });
    theAlert.present();
  }

  getAccTypes(){
    this.apiServices.getAcctTypes().then((result) => {
      this.responseData = result;
      if (!this.responseData.error) {
        console.log(this.responseData);
      }
    });
  }

  registerAccount(){ 
    var loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  loading.present();

  if(this.reg.fname == ""){
    loading.dismiss(); 
    this.utils.presentAlert('Form Error!', 'first name required ');
    this.regValidator.fname = "visible";
    return;
  }
  if(this.reg.lname == ""){
    loading.dismiss();
    this.utils.presentAlert('Form Error!', 'last name required ');
    this.regValidator.lname = "visible";
    return;
  }
  if(this.reg.bvn == ""){
    loading.dismiss();
    this.utils.presentAlert('Form Error!', 'BVN required ');
    this.regValidator.bvn = "visible";
    return;
  } 
   if(this.reg.bvn.length !== 11){
    loading.dismiss();
    this.utils.presentAlert('Form Error!', 'BVN must be 11 digit ');
    this.regValidator.bvn = "visible";
    return;
  }
  
  if(this.reg.accounttype == ""){
    loading.dismiss();
    this.utils.presentAlert('Form Error!', 'Account Type required ');
    this.regValidator.accounttype = "visible";
    return;
  }
  if(this.reg.phone == ""){
    loading.dismiss();
    this.utils.presentAlert('Form Error!', 'phone no required ');
    this.regValidator.phone = "visible";
    return;
  }
  if(this.reg.dob == ""){
    loading.dismiss();
    this.utils.presentAlert('Form Error!', 'DOB required ');
    this.regValidator.dob = "visible";
    return;
  }
  if(this.reg.address == ""){
    loading.dismiss();
    this.utils.presentAlert('Form Error!', 'address required ');
    this.regValidator.address = "visible";
    return;
  }
  if(this.reg.state == ""){
    loading.dismiss();
    this.utils.presentAlert('Form Error!', 'state required ');
    this.regValidator.state = "visible";
    return;
  }
    //this.reg.phone = this.phone;
    this.apiServices.loginUser(this.reg, 'customer/register').then((result) => {
      this.responseData = result;
      if (!this.responseData.error) {
        loading.dismiss();
        console.log(this.responseData);
        // this.userRecord = this.responseData;
        // this.userRecord.token = this.generateToken();
         this.utils.localSave('AgentDetails',this.reg);
         this.utils.presentAlert('Success!',this.responseData.message);
         this.reg = {pics:'',phone:'',bvn:'',fname:'',accounttype:'',lname:'',mname:'',email:'',address:'',city:'',state:'',dob:'',gender:'', lga:''};
        // this.navCtrl.setRoot(this.HomePage); 
        this.displayRec.AccountType='';
      }
      else {
        this.utils.presentAlert('Reg Error!',this.responseData.message);
      }
    }, (err) => {
      console.error(err);
    })
  }
  DisplayAcctType(){
    // this.apiService.getAcctTypesById(this.saveRec.customerId).then((res) => {
    //       console.log(res);
    //       const AccountTypesPage: Modal = this.modal.create("AcctTypePage", { data: res });
    //       AccountTypesPage.present();
    //       AccountTypesPage.onDidDismiss((data) => {
    //           if (data) {
    //               this.saveRec.accountId = data.sn;
    //               this.displayRec.AccountType = data.account_name;
    //               this.displayRec.AccountNumber=  data.account_num
    //           }
    //           else
    //           this.utils.presentAlert("No Data","No Account Type Selected");
    //       });
    //     });
    //     /*
         this.utils.localGet("AccountTypes").then((result) => {
          const AccountTypesPage: Modal = this.modal.create("AcctTypePage", { data: result });
          AccountTypesPage.present();
          AccountTypesPage.onDidDismiss((data) => {
              if (data) {
                console.log(data);
                  this.reg.accounttype = data.sn;
                  this.displayRec.AccountType = data.account_name;
              }
              else
              this.utils.presentAlert("No Data","No Account Type Selected");
          });
      });
  }
  // takePhoto() {
  //   const options: CameraOptions = {
  //       quality: 50,
  //       destinationType: this.camera.DestinationType.DATA_URL,
  //       encodingType: this.camera.EncodingType.JPEG,
  //       mediaType: this.camera.MediaType.PICTURE,
  //       targetWidth: 600,
  //       targetHeight: 600,
  //       saveToPhotoAlbum: false
  //   };
    
  //   this.camera.getPicture(options).then(
  //       imageData => {
  //         // this.base64Image = "data:image/jpeg;base64," + imageData;
  //         // this.photos.push(this.base64Image);
  //         // this.photos.reverse();
  //         // this.sendData(imageData);
  //      },
  //      err => {
  //        console.log(err);
  //      }
  //   );
  //   }

 
    public presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Select Image Source',
        buttons: [
          {
            text: 'Load from Library',
            handler: () => {
              this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
          },
          {
            text: 'Use Camera',
            handler: () => {
              this.takePicture(this.camera.PictureSourceType.CAMERA);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
    }

    public takePicture(sourceType) {
      // Create options for the Camera Dialog
      var options = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };
     
      // Get the data of an image
      this.camera.getPicture(options).then((imagePath) => {
        // Special handling for Android library
        if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath)
            .then(filePath => {
              let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
              let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            });
        } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        }
      }, (err) => {
        this.presentToast('Error while selecting image.');
      });
    }
    // Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}
public uploadImage() {
  // Destination URL
  var url = "http://www.avantesoft.com/thrift/contents_imgs/customer_imgs"; 
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };
 
  const fileTransfer: TransferObject = this.transfer.create();
 
  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Image succesful uploaded.');
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });
}
    /*DisplayAcctType(){
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
      });
    }*/
}
