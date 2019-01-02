import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocketServiceProvider } from '../../providers/socket-service/socket-service';
import { ToastController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import {Md5} from 'ts-md5/dist/md5';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the CreateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {
  private player: any={
    player_id: 0,
    nickname: 'unknown',
    firstname: '',
    lastname: '',
    birthday: null,
    sex: null,
    password: '',
    inviteToken: '',
    invitedBy: 0,
    authDevice: null,
    role: 0 } ;
  private password2: String ='';
  private keepLoggedIn: boolean = false;
  private passwordIsHashed = false;
  private oldPassword:String = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public socketService: SocketServiceProvider, private toastCtrl: ToastController, public device: Device, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.player = this.navParams.get('player');
    if(this.player.password != ''){
      this.passwordIsHashed = true;
      this.oldPassword = this.player.password;
    }
  }
  ionViewWillLeave() {

  }
  validatePassword(){
    if(this.password2 != '' && this.player.password != ''){
      if(this.password2 != this.player.password){
        this.presentToast('Passwords has to match each other').present();
        this.password2 = '';
        this.player.password = '';
        return false;
      }else{
        return true;
      }
    }
  }

  validateInputsNotEmpty(){
    let invalid = false;
    let msg = "{";
    if (this.player.firstname == null){
      msg = msg + " Vorname;";
      invalid = true;
    }
    if (this.player.lastname == null){
      msg = msg + " Nachname;";
        invalid = true;
    }
    if (this.player.birthday == '0000-00-00'){
      msg = msg + " Geburtsdatum;";
        invalid = true;
    }
    if (this.player.sex == null){
      msg = msg + " Geschlecht;";
        invalid = true;
    }
    if (this.player.password == ''){
      msg = msg + " Passwort;";
        invalid = true;
    }
    msg = msg + "}";
    if(invalid){
      this.presentToast("Bitte die Felder "+msg+" ausfüllen!").present();
      return false;
    }else{
      return true;
    }

  }
  keepLoggedInSwap(){
    if(this.keepLoggedIn == true){
      this.player.authDevice = this.device.uuid;
    }else{
      this.player.authDevice = null;
    }
  }

  createAccount(){
      if((this.validateInputsNotEmpty()==true) && (this.validatePassword()==true)){
      //Decide what to do with the password to prevent double hashing:
      if(this.passwordIsHashed==false){
        this.player.password = Md5.hashStr(this.player.password);
      }else if(this.passwordIsHashed == true && this.player.password != this.oldPassword){
        this.player.password = Md5.hashStr(this.player.password);
      }//else keep old password and do not hash it again...
      this.socketService.updatePlayer(this.player);
      this.storage.set('player', this.player);
      this.navCtrl.setRoot("AtriumPage", {'player':this.player});
    }else{
      this.presentToast("Some Error").present();
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
