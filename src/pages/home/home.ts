import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocketServiceProvider } from '../../providers/socket-service/socket-service';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public socketService: SocketServiceProvider) {
      socketService.initConnection();
      console.log('first ');
  }



}
