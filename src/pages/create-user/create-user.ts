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

  back() {
    console.log('back pushed');
    this.navCtrl.pop();
  }

  setUser() {
    console.log('trying to set user');
    let user: User = {name: this.userName};

    this.errors = [];
    var status = true;

    if(this.userName.length < 2) {
      this.errors.push('Needs to be 2 or more characters');
      status = false;
    }
    else if(this.userName.length > 15) {
      this.errors.push('Needs to be less than 16 characters');
      status = false;
    }

    if(!status) {
      return;
    }

    this.stateProvider.setUser(user);
    this.stateProvider.save();

    this.userProvider.getUsers()
      .then(val => {
        status = this.userProvider.addUser(user);
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
