import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PopoverController } from 'ionic-angular';
import { MgmtPopoverComponent } from '../../components/mgmt-popover/mgmt-popover';
import { ToastController } from 'ionic-angular';
import { SocketServiceProvider } from '../../providers/socket-service/socket-service';
import { AlertController } from 'ionic-angular';

/**
* Generated class for the CreateTaskPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-create-task',
  templateUrl: 'create-task.html',
})
export class CreateTaskPage {
  private player:String;

  private task:any = {
    content: "",
    level: "",
    points: "",
    cat: "",
    fuer: "b",
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public popoverCtrl: PopoverController, private toastCtrl: ToastController, public socketService: SocketServiceProvider, private alertCtrl: AlertController) {
    this.storage.get('player').then((val) => {
      this.player = val;
      console.log(this.player);
    });
  }

  ionViewDidLoad() {

  }

  backButtonClick(){
    this.navCtrl.pop();
  }

  validateAndCreateTask(){
    if(this.checkRequiredFields()){
      this.socketService.createTask(this.task);
      this.navCtrl.pop();
    }
  }
  checkRequiredFields(){
    let valid = true;
    if(this.task.content == ""){
      this.presentToast("Feld: Beschreibung fehlt!")
      valid = false;
    }
    if(this.task.cat == ""){
      this.presentToast("Feld: Kategorie fehlt!")
      valid = false;
    }
    if(this.task.level == ""){
      this.presentToast("Feld: Level fehlt!")
      valid = false;
    }
    if(this.task.points == ""){
      this.presentToast("Feld: Punkte fehlt!")
      valid = false;
    }
    if(this.task.level > 10){
      valid = false;
      this.presentToast("Level darf nicht größer als 10 sein!")
    }

    if (valid){
      this.task.createdBy = this.player.player_id;
      return true;
    }else{
      return false;
    }
  }

  addWildCard(){
    let alert = this.alertCtrl.create({
      title: 'Add Wildcard',
      message: "Wildcard zum einfügen auswählen:",
      inputs: [
        {
          name: 'RandomB',
          label: "Zufällig Spieler",
          value:"{B}",
          checked: true,
          type: 'radio'
        },
        {
          name: 'RandomF',
          label: "Zufällig weiblicher Spieler",
          value:"{F}",
          type: 'radio'
        },
        {
          name: 'RandomM',
          label: "Zufällig männlicher Spieler",
          value:"{M}",
          type: 'radio'
        },
        {
          name: 'RandomOG',
          label: "Zufll Spieler anderes Geschlecht",
          value:"{OG}",
          type: 'radio'
        },
        {
          name: 'RandomSG',
          label: "Zufll Sp gleiches Geschlecht",
          value:"{SG}",
          type: 'radio'
        }

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Einfügen',
          handler: data => {
            this.task.content = this.task.content + data
          }
        }
      ]
    });
    alert.present();
  }
  showInfo() {
    let alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: 'Die {} (Wildcards) werden InGame gegen einen entsprechenden zufälligen Spieler ausgetauscht. <i><b>Beachte:</b> zweimal z.B. {m} innerhalb einer Aufgabe verweist nicht zwangsmäßig auf den selben männlichen Spieler!</i>',
      message: '<b>{M}</b> = zufälliger <u>männlicher</u> Spieler </br>'+
      ' <b>{W}</b> = zufälliger <u>weiblicher</u> Spieler </br>'+
      ' <b>{B}</b> = zufälliger Spieler <u>egal welches</u> Geschlecht </br>'+
      ' <b>{OG}</b> = zufälliger Spieler des <u>anderen</u> Geschlechts als für den die Aufgabe/Frage ist. </br>'+
      ' <b>{SG}</b> = zufälliger Spieler des <u>gleichen</u> Geschlechts als für den die Aufgabe/Frage ist.',
      buttons: ['Ok']
    });

    alert.present();
}


  // MENUE : _____________________________________

  presentPopover(myEvent) {

    let popover = this.popoverCtrl.create(MgmtPopoverComponent,{'isAdmin': this.isAdmin(), 'player': this.player});
    popover.present({
      ev: myEvent
    });
  }

  isAdmin(){
    if(this.player.role <= 1){
      return true;
    }else{
      return false;
    }
  }
  isCreator(){
    if(this.player.role <= 2){
      return true;
    }else{
      return false;
    }
  }
  isNovice(){
    if(this.player.role <= 3){
      return true;
    }else{
      return false;
    }
  }
  // TOAST:_______________
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
