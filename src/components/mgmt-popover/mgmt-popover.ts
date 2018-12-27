import { Component } from '@angular/core';
import { NavParams, ModalController } from 'ionic-angular'
import { ViewController } from 'ionic-angular';


/**
 * Generated class for the MgmtPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'mgmt-popover',
  templateUrl: 'mgmt-popover.html'
})
export class MgmtPopoverComponent {

  private isAdmin: boolean = false;
  private player: any;
  constructor(public navParams:NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController) {
    this.isAdmin = this.navParams.get('isAdmin');
    this.player = this.navParams.get('player');
  }


  presentModal() {
   let modal = this.modalCtrl.create('GenerateTokenPage', {'player_id': this.player.player_id});
   this.viewCtrl.dismiss();
   modal.present();
 }



}
