import { Component } from '@angular/core';
import { IonicPage, NavController, App, ModalController, AlertController, NavParams } from 'ionic-angular';

import { StateProvider } from '../../providers/state/state';
import { UserProvider } from '../../providers/user/user';

import { CreateUserPage } from '../create-user/create-user';

import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})

export class UserProfilePage {

  userImage: string;

  user: User;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public stateProvider: StateProvider,
              public alertCtrl: AlertController,
              public userProvider: UserProvider,
              public modalCtrl: ModalController,
              public app: App) {

    stateProvider.getUser()
      .then(val => {
        this.user = val;
        console.log('User set to ' + JSON.stringify(this.user));
      })
    userProvider.getUsers()
      .then(val => {});

    this.userImage = './assets/user-image-default.svg';
  }

  changeUserPushed() {
    this.userProvider.getUsers()
      .then(users => {
        let alert = this.alertCtrl.create();
        alert.setTitle('Select User');

        for(var i = 0; i < users.length; ++i) {
          if(i == 0) {
            alert.addInput({
              type: 'radio',
              label: users[i].name,
              value: '' + i,
              checked: true
            });
          }
          else {
            alert.addInput({
              type: 'radio',
              label: users[i].name,
              value: '' + i,
              checked: false
            });
          }
        }

        alert.addButton({
          text: 'Create New',
          handler: data => {
            this.createNewUser();
          }
        })
        alert.addButton({
          text: 'OK',
          handler: data => {
            this.changeUser(users[+data]);
            this.rearrangeUsers();
          }
        });
        alert.present();
      })
  }

  createNewUser() {
    let createUserModal = this.modalCtrl.create(CreateUserPage, {backButton: true});

    createUserModal.onDidDismiss(data => {
      if(data) {
        this.user = data;
      }
    });

    createUserModal.present();
  }

  changeUser(changingTo: User) {
    this.user = changingTo;
    this.stateProvider.setUser(changingTo);
  }

  rearrangeUsers() {
    this.userProvider.moveToStart(this.user);
  }

  deleteUser() {
    this.userProvider.removeUser(this.user);

    this.userProvider.getUsers()
      .then(users => {
        if(users.length > 0) {
          this.stateProvider.setUser(users[0]);
          this.user = users[0];
        }
        else {
          this.stateProvider.clearUser();
          this.user = null;
          this.app.getRootNav().setRoot(CreateUserPage);
        }
      });
    
  }

  confirmDeletion() {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      subTitle: 'Are you sure you want to permanently delete the user \'' + this.user.name + '\' ?'
    })
    alert.addButton({
      text: 'Cancel'
    });
    alert.addButton({
      text: 'I\'m sure',
      handler: data => {
        this.deleteUser();
      }
    });

    alert.present();
  }

}
