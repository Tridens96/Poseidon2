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

  private uuid: String = "";

  constructor(public socket: Socket, public device: Device, public plt: Platform) {
    //listen to be asked to register/identify my self
    //normally should be called back from the server on connection
    this.socket.on('whoAreYou', ()=>{
      console.log('Device was asked to identify...');
      this.identifyDevice();
    });

  }


  identifyDevice(){
    //Wait for the device to be ready to get information about it.
    this.plt.ready().then(() => {

      this.uuid=this.device.uuid
      if(this.uuid == null){
        this.uuid = "NoIdPresent";
      }
      let registrationData = {
        "device_uuid": this.uuid,
      }
      this.socket.emit('register', registrationData);
      console.log('Device has identified as: {'+this.uuid+'}');

      // this.plt.pause.subscribe(() => {
      //   console.log('[INFO] App paused');
      // });
      //
      // this.plt.resume.subscribe(() => {
      //   console.log('[INFO] App resumed');
      // });

    });
  }

  //####################### Database API ################################
  async getPlayerBy(token, callback){
    let data = {'token':token};
    this.socket.emit('getPlayerInfo', data);
    if(callback == null){
      return new Promise((resolve, reject)=>{
        this.socket.on('getPlayerInfoResponse', (responsedata)=>{
          resolve(responsedata);
        });
      });
    }else{
      //legacy code - better work with promises TODO: Remove
      this.socket.on('getPlayerInfoResponse', (responsedata)=>{
        callback(responsedata);
      });
    }
  }

  getPlayerById(id,callback){
    let data = {'player_id':id};
    this.socket.emit('getPlayerInfo', data);
    this.socket.on('getPlayerInfoResponse', (responsedata)=>{
      callback(responsedata);
    });

  }

  async getPlayerByLogin(login){
    let data = {'login':login};
    return new Promise((resolve, reject)=>{
      this.socket.emit('getPlayerInfo', data);
      this.socket.on('getPlayerInfoResponse', (responsedata)=>{
        resolve(responsedata);
      });
    });
  }

  getPlayerByDeviceUUID(uuid, callback){
    let data = {'uuid':uuid};
    this.socket.emit('getPlayerInfo', data);
    this.socket.on('getPlayerInfoResponse', (responsedata)=>{
      callback(responsedata);
    });
  }

  updatePlayer(player){
    this.socket.emit('updatePlayer',player);
  }

  createPlayer(newplayer){
    this.socket.emit('createPlayer', newplayer);
  }

  createTask(task){
      this.socket.emit('createTask', task);
  }

  getDeviceUUID(){
    if(this.uuid == ""){
      this.uuid = this.device.uuid;
    }
    return this.uuid;
  }

}
