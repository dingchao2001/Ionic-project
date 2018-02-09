import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import {Network} from "@ionic-native/network";
import { InAppBrowser } from "@ionic-native/in-app-browser";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GlobalData } from "../providers/GlobalData";
import { PROVIDERS } from './imports';
import { SharedModule } from './shared.module';

import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    NgCalendarModule,
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:'true',
      backButtonText:'',
      cancelButton:' 取消'
    }),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    GlobalData,
    SplashScreen,
    InAppBrowser,
    Network,
    PROVIDERS,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
