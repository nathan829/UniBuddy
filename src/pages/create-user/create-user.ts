import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController, ViewController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { SubjectPage } from '../subject/subject';

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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public stateProvider: StateProvider,
              public userProvider: UserProvider,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController) {

    this.userName = '';
    this.nameErrors = [];
    this.subjects = [];
    var backButtonNeeded = this.navParams.get('backButton');
    if(backButtonNeeded) {
      this.backButtonNeeded = backButtonNeeded;
    }
  }

  cancel() {
    if(this.subjects.length > 0) {
      let confirmationAlert = this.alertCtrl.create({
        title: 'Confirmation',
        message: 'Are you sure you want to abandon your creation?'
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

  openSubject(index: number) {
    console.log('trying to read subject indexed at ' + index + ' from ' + JSON.stringify(this.subjects));
    let subjectModal = this.modalCtrl.create(SubjectPage, {subject: this.subjects[index]});

    subjectModal.onDidDismiss(val => {
      if(val) {
        this.subjects[index] = val;
      }
    });

    subjectModal.present();
  }

  nextToAdd(index: number): boolean {
    return this.subjects.length == index-1;
  }

  addButtonPressed() {
    this.subjects.push({code: 'COMP110', name: 'science'});
  }

  validate() {
    if(this.userName.length < 2) {
      this.nameErrors = ['Minimum 2 characters'];
    }
    else if(this.userProvider.userExists(this.userName)) {
      this.nameErrors = ['Name already exists'];
    }
    else {
      this.nameErrors = [];
    }
  }

  inputChanged() {
    this.nameErrors = [];
    // this.validate();
  }

  inputFinished() {
    this.validate();

    if(this.nameErrors.length == 0) {
      var user = {name: this.userName, subjects: this.subjects};
      if(this.subjects.length == 0) {
        let confirmationAlert = this.alertCtrl.create({
          title: 'Confirmation',
          message: 'Proceed without subjects added?'
        });

        confirmationAlert.addButton({
          text: 'Go Back'
        });
        confirmationAlert.addButton({
          text: 'Okay',
          handler: data => {
            this.submitNewUser(user);
          }
        })

        confirmationAlert.present();
      }
      else {
        this.submitNewUser(user);
      }
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
