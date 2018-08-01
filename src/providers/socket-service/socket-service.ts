import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Device } from '@ionic-native/device';
import { Platform } from 'ionic-angular';




/*
  Generated class for the SocketServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocketServiceProvider {

   private uuid: String;

  constructor(public socket: Socket, public device: Device, public plt: Platform) {

  }

  initConnection(){

    //Wait for device to be ready to get information about it.
    this.plt.ready().then(() => {
      this.uuid=this.device.uuid
      if(this.uuid == null){
        this.uuid = "NoIdPresent";
      }
        let registrationData = {
          "device_uuid": this.uuid,
        }
        this.socket.emit('register', registrationData);
        console.log('Client got initally registered with ID: {'+this.uuid+'}');

        this.plt.pause.subscribe(() => {

          console.log('[INFO] App paused');
        });

        this.plt.resume.subscribe(() => {

          console.log('[INFO] App resumed');
        });

    });
  }
}
