import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocketServiceProvider } from '../../providers/socket-service/socket-service';


/**
 * Generated class for the GenerateTokenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-generate-token',
  templateUrl: 'generate-token.html',
})
export class GenerateTokenPage {
  private player_id;
  private nickname: String = "";
  private token: String = "";
  private tokenSource = "abcdefghijklmnopqrstuvqxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  constructor(public navCtrl: NavController, public navParams: NavParams, public socketService: SocketServiceProvider) {
    this.player_id = this.navParams.get('player_id');
  }

  closeModal(){
    this.navCtrl.pop();
  }

  generateToken(){
    this.token = "";
    //62 chars
    for(let i = 0; i<7;i++){
      this.token = this.token + this.tokenSource.charAt(Math.random()*61);
    }
    this.socketService.getPlayerBy(this.token,(data) =>{
      if(data.length>0){
        console.log("Token ["+this.token+"] is already in use. Try to create a new Token - RECURSIVE call!")
        this.generateToken();
      }else{
        let newPlayer = {'inviteToken' : this.token, 'nickname' : this.nickname, 'invitedBy' : this.player_id};
        this.socketService.createPlayer(newPlayer);
      }
    })
//TODO: der soll irgendwann mal ins clipboard
    console.log(this.token);

  }







}
