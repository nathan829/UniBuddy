import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ViewController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';
import { Subject } from '../../models/subject';

import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage {

  nameBefore: string;
  name: string;

  nameErrors: string[];

  changeMade: boolean;

  subjects: Subject[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public userProvider: UserProvider,
              public alertCtrl: AlertController) {

    this.name = navParams.get('user').name;
    this.nameBefore = this.name;
    this.subjects = [];
    this.nameErrors = [];
    this.changeMade = false;

    navParams.get('user').subjects.forEach(subject => {
      this.subjects.push(subject);
    });
  }

  cancel() {
    if(this.changeMade || this.name.trim() != this.nameBefore) {
      let confirmationAlert = this.alertCtrl.create({
        title: 'Confirmation',
        message: 'Abandon your changes?'
      });

      confirmationAlert.addButton({
        text: 'Go Back'
      });
      confirmationAlert.addButton({
        text: 'Okay',
        handler: data => {
          this.navCtrl.pop();
        }
      })

      confirmationAlert.present();
    }
    else {
      this.navCtrl.pop();
    }
  }

  save() {
    this.validate();
    
    if(this.nameErrors.length == 0) {
      var user = {name: this.name.trim(), subjects: this.subjects};
      this.viewCtrl.dismiss(user);
    }
  }

  validate() {
    if(this.name.length < 2) {
      this.nameErrors = ['Minimum 2 characters'];
    }
    else if(this.userProvider.userExists(this.name)) {
      this.nameErrors = ['Name already exists'];
    }
    else {
      this.nameErrors = [];
    }
  }

  inputChanged() {
    this.nameErrors = [];
  }

  nextToAdd(index: number): boolean {
    return this.subjects.length == index-1;
  }

  addButtonPressed() {
    this.subjects.push({code: 'COMP110', name: 'science'});
    this.changeMade = true;
  }

  cellVisible(index: number): boolean {
    if(index-1 <= this.subjects.length) {
      return true;
    }
    return false;
  }

}
