import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocketServiceProvider } from '../../providers/socket-service/socket-service';
import {CreateTaskPage} from '../create-task/create-task';

/**
 * Generated class for the TaskListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {

  private player:String;

  private tasks:any = [] ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public socketService: SocketServiceProvider) {
    this.storage.get('player').then((val) => {
      this.player = val;
    });
    this.socketService.getTasks("").then((data)=>{
      console.log(data);
      this.tasks = data;
    });

  }

  backButtonClick(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {

  }
  watchTask(task){
    this.navCtrl.push("CreateTaskPage", {'task':task, 'edit':false});
  }
  editTask(task){
    this.navCtrl.push("CreateTaskPage", {'task':task, 'edit':true});
  }

}
