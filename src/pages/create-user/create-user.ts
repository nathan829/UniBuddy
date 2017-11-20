import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { User } from '../../models/user';

import { StateProvider } from '../../providers/state/state';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html',
})
export class CreateUserPage {

  userName: string;
  backButtonNeeded: boolean;
  // newUserNeeded: {status: boolean};

  errors: string[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public stateProvider: StateProvider,
              public userProvider: UserProvider,
              public viewCtrl: ViewController) {

    this.userName = '';
    this.errors = [];
    var backButtonNeeded = this.navParams.get('backButton');
    if(backButtonNeeded) {
      this.backButtonNeeded = backButtonNeeded;
    }
  }

  cancel() {
    this.navCtrl.pop();
  }

  setUser() {
    let user: User = {name: this.userName};

    this.errors = [];

    if(this.userName.length < 2) {
      this.errors.push('Needs to be 2 or more characters');
      return;
    }

    this.stateProvider.setUser(user);
    this.stateProvider.save();

    this.userProvider.getUsers()
      .then(val => {
        var status = this.userProvider.addUser(user);
        if(!status) {
          this.errors.push('Name already exists');
        }
        else {
          if(this.backButtonNeeded) {
            this.viewCtrl.dismiss(user);
          }
          else {
            this.navCtrl.setRoot(TabsPage);
          }
        }
      });
  }

}
