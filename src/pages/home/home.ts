import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocketServiceProvider } from '../../providers/socket-service/socket-service';
import { ToastController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { Platform } from 'ionic-angular';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private inviteToken: String = '';
  private username = ""; //firstname.lastname
  private password = "";

  constructor(public navCtrl: NavController, public socketService: SocketServiceProvider, private toastCtrl: ToastController, public device: Device, public platform: Platform) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.checkIfDeviceIsRegistered();
    });
  }

  checkIfDeviceIsRegistered(){
    console.log(this.socketService.getDeviceUUID());
    this.socketService.getPlayerByDeviceUUID(this.socketService.getDeviceUUID(), (responsedata) => {
      if(responsedata.length == 1) {
      //  this.navCtrl.setRoot("AtriumPage", {'player':responsedata[0]});
      }
    });
  }

  getPlayerByToken(){
    if(this.inviteToken != ''){
      this.socketService.getPlayerBy(this.inviteToken,(responsedata) =>{
        if(responsedata.length < 1) {
          this.inviteToken = "Wrong Token ..."
        }else{
          this.navCtrl.push("CreateAccountPage", {'player':responsedata[0]});
        }
      });
    }else{
      this.presentToast("Invite token required to create an account!");
    }
  }
  //hier weiter
  async login(){
    if(this.username != ""  && this.password!="" && this.username.includes(".")){
      let data = await this.socketService.getPlayerByLogin(this.username);
      if(typeof data[0] != "undefined"){
        console.log(Md5.hashStr(this.password) +" =="+ data[0].password);
        if(Md5.hashStr(this.password) === data[0].password){
          console.log("dring");
          this.navCtrl.push("AtriumPage", {'player':data[0]});
        }else{
          this.presentToast("Wrong password!");
        }
      }
    }else{
      this.presentToast("Please provide requiered fields!");
    }
  }

  presentToast(msg) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000,
        position: 'top',
        cssClass: "error"
      });
      toast.present();
  }


}
