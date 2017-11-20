import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SettingsProvider } from '../../providers/settings/settings';

import { UserProfilePage } from '../user-profile/user-profile';

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
    this.navCtrl.push(UserProfilePage);
  }

  ionViewDidEnter() {
    
  }

}
