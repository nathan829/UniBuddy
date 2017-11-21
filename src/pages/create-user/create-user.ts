import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { User } from '../../models/user';
import { Subject } from '../../models/subject';

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
  
  subjects: Subject[];

  nameErrors: string[];

  // @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public stateProvider: StateProvider,
              public userProvider: UserProvider,
              public viewCtrl: ViewController) {

    this.userName = '';
    this.nameErrors = [];
    this.subjects = [];
    var backButtonNeeded = this.navParams.get('backButton');
    if(backButtonNeeded) {
      this.backButtonNeeded = backButtonNeeded;
    }
  }

  cancel() {
    this.navCtrl.pop();
  }

  submitNewUser(user: User) {
    this.stateProvider.setUser(user);
    this.userProvider.addUser(user);

    if(this.backButtonNeeded) {
      this.viewCtrl.dismiss(user);
    }
    else {
      this.navCtrl.setRoot(TabsPage);
    }
  }

  cellVisible(index: number): boolean {
    if(index-1 <= this.subjects.length) {
      return true;
    }
    return false;
  }

  backButtonPushed() {
    // this.slides.lockSwipes(false);
    // this.slides.slidePrev();
    // this.slides.lockSwipes(true);
  }

  nextToAdd(index: number): boolean {
    return this.subjects.length == index-1;
  }

  addButtonPressed() {
    this.subjects.push({code: 'COMP110', name: 'science'});
  }

  validate() {
    if(this.userName.length < 2) {
      this.nameErrors = ['Minimum 2 characters'];     // <------ Change these
    }
    else if(this.userProvider.userExists(this.userName)) {
      this.nameErrors = ['Name already exists'];      // <------ Change these
    }
    else {
      this.nameErrors = [];
    }
  }

  inputFinished() {
    this.validate();

    if(this.nameErrors.length == 0) {
      var user = {name: this.userName, subjects: this.subjects};
      this.submitNewUser(user);
    }
  }

  // this.stateProvider.setUser(user);
  //   this.stateProvider.save();

  // if(this.backButtonNeeded) {
  //           this.viewCtrl.dismiss(user);
  //         }
  //         else {
  //           this.navCtrl.setRoot(TabsPage);
  //         }

}
