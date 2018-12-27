import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Device } from '@ionic-native/device';
import { ViewController } from 'ionic-angular';


import { MgmtPopoverComponent } from '../components/mgmt-popover/mgmt-popover';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { SocketServiceProvider } from '../providers/socket-service/socket-service';


const config: SocketIoConfig = { url: 'http://192.168.178.38:3001', options: {} };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MgmtPopoverComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MgmtPopoverComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    SocketServiceProvider,
    SocketIoModule,


    {provide: ErrorHandler, useClass: IonicErrorHandler},


  ]
})
export class AppModule {}
