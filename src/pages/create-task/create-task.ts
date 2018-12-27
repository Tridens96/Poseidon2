import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTaskPage');
  }
  backButtonClick(){
    this.navCtrl.pop();
  }
  presentPopover(myEvent) {
    alert("This route is not implemented by now");
    // let popover = this.popoverCtrl.create(MgmtPopoverComponent,{'isAdmin': this.isAdmin(), 'player': this.player});
    // popover.present({
    //   ev: myEvent
    // });
  }
}
