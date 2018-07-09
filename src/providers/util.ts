import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Injectable()
export class utilServices {
    constructor(public alertCtrl: AlertController, private storage: Storage,
        private camera: Camera) {
    }
    //utility for alert pop ups
    presentAlert(titleTxt, subtitleTxt) {
        let alert = this.alertCtrl.create({
            title: titleTxt,
            subTitle: subtitleTxt,
            cssClass: 'danger',
            buttons: ['Dismiss']
        });
        alert.present();
    }
    //utility for fetching and saving in local storage
    localSave(key, Rec) {
        this.storage.set(key, Rec);
    }
    localGet(keyName) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            this.storage.get(keyName).then(res => {
                console.log(res);
                resolve(res);
            }, (err) => {
                reject(err);
                console.log(err);
            });
    });
}
    //utility for showing radio alerts
    showRadioAlert(title, values) {
        let alert = this.alertCtrl.create();
        alert.setTitle(title);
        values.forEach(element => {
            alert.addInput({
                type: 'radio',
                label: element.label,
                value: element.value,
                checked: false,
            });
        });

        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: data => {
                // this.testRadioOpen = false;
                // this.testRadioResult = data;
            }
        });
        alert.present();
    }
    // utility for showing camera 

    cameraAction() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            let base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            // Handle error
        });
    }
}