import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocketServiceProvider } from '../../providers/socket-service/socket-service';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  inviteToken: String = '';
  test;

  constructor(public navCtrl: NavController, public socketService: SocketServiceProvider, private toastCtrl: ToastController) {
  }

  getPlayerByToken(){
    if(this.inviteToken != ''){
      this.socketService.getPlayerBy(this.inviteToken,(responsedata) =>{
        if(responsedata.length < 1) {
          this.inviteToken = "Wrong Token ..."
        }else{
          this.test = responsedata[0].nickname;
        }
      });
    }else{
      this.presentToast("Invite token required to create an account!").present();
    }
  }

  presentToast(msg) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000,
        position: 'top',
        cssClass: "error"
      });


    return toast;



}


}
