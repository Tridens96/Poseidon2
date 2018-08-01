import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocketServiceProvider } from '../../providers/socket-service/socket-service';
import { BackgroundMode } from '@ionic-native/background-mode';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController, public socketService: SocketServiceProvider, public backgroundMode : BackgroundMode) {
      socketService.initConnection();
      console.log('first ');
  }
  enableBackgroundMode(){
    this.backgroundMode.enable();
  }


}
