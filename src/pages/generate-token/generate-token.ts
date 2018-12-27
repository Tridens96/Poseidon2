import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocketServiceProvider } from '../../providers/socket-service/socket-service';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the GenerateTokenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'generate-token',
  templateUrl: 'generate-token.html',
})
export class GenerateTokenPage {
  private player_id;
  private nickname: String = "";
  private token: String = "";
  private tokenSource = "abcdefghijklmnopqrstuvqxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  constructor(public navCtrl: NavController, public navParams: NavParams, public socketService: SocketServiceProvider, public viewCtrl: ViewController,) {
    this.player_id = this.navParams.get('player_id');
  }

  closeModal(){
    this.navCtrl.pop();
  }
  //LÖSUNG: es liegt entweder am async oder am socket denn die alert unten funtioniert.
  generateToken(){
    this.token = "";
    //62 chars (index: 0-61)
    for(let i = 0; i<7;i++){
      this.token = this.token + this.tokenSource.charAt(Math.random()*61);
    }
    this.socketService.getPlayerBy(this.token,null).then((data) =>{
      if(data!="{}" && data.length>0){
        console.log("Token ["+this.token+"] is already in use. Tring to create a new Token - RECURSIVE call!")
        this.generateToken();
      }else{
        let newPlayer = {'inviteToken' : this.token, 'nickname' : this.nickname, 'invitedBy' : this.player_id};
        this.socketService.createPlayer(newPlayer);
        //TODO: der soll irgendwann mal ins clipboard
        console.log(this.token);

      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }







}
