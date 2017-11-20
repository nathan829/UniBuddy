import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SettingsProvider } from '../../providers/settings/settings';

import { UserSettingsPage } from '../user-settings/user-settings';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})

export class SettingsPage {

  currentTheme: String;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private settingsProv: SettingsProvider) {
    
  }

  userButtonPushed() {
    this.navCtrl.push(UserSettingsPage);
  }

  ionViewDidEnter() {
    
  }

}
