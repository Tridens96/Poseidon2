import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PopoverController } from 'ionic-angular';
import { MgmtPopoverComponent } from '../../components/mgmt-popover/mgmt-popover';

import {CreateTaskPage} from '../create-task/create-task';
/**
 * Generated class for the AtriumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atrium',
  templateUrl: 'atrium.html',
})
export class AtriumPage {
  private player: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
    this.player = this.navParams.get('player');
  }


  push(page){
    this.navCtrl.push(page);
  }

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

  ionViewDidLoad() {
    this.player = this.navParams.get('player');
  }

}
