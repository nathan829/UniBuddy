import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { CreateUserPage } from '../pages/create-user/create-user';
import { BlankPage } from '../pages/blank/blank';

import { SettingsProvider } from '../providers/settings/settings';
import { StateProvider } from '../providers/state/state';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  root: any = BlankPage;

  newUserNeeded: {status: boolean};

  constructor(platform: Platform, 
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public settingsProvider: SettingsProvider,
              public stateProvider: StateProvider) {
    
    platform.ready().then(() => {
      
      statusBar.overlaysWebView(false);

      statusBar.backgroundColorByHexString('#161616');

      splashScreen.hide();
    });

    stateProvider.getUserStatus()
      .then(val => {
        this.newUserNeeded = val;
        this.root = this.getPage();
      })
  }

  userHasBeenSet(): boolean {
    if(!this.newUserNeeded || this.newUserNeeded.status == true) {
      return false;
    }

    return true;
  }

  getPage(): any {
    if(this.userHasBeenSet()) {
      return TabsPage;
    }
    
    return CreateUserPage;
  }
  
}
