import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { User } from '../../models/user';

import { Storage } from '@ionic/storage';

@Injectable()
export class StateProvider {

  currentUser: User;
  newUserNeeded: {status: boolean};

  constructor(public storage: Storage) {
    
  }

  getUser(): Promise<User> {
    return new Promise<User>((resolve) =>{
      if(!this.currentUser) {
        this.storage.ready()
          .then(() => {
            this.storage.get('user')
              .then(val => {
                this.currentUser = val;
                resolve(this.currentUser);
              })
          })
      }
      else {
        resolve(this.currentUser);
      }
    });
  }

  getUserStatus(): Promise<{status: boolean}> {
    return new Promise<{status: boolean}>((resolve) =>{
      if(!this.newUserNeeded) {
        this.storage.ready()
          .then(() => {
            this.storage.get('user-status')
              .then(val => {
                this.newUserNeeded = val;

                resolve(this.newUserNeeded);
              })
          })
      }
      else {
        resolve(this.newUserNeeded);
      }
    });
  }

  setUser(user: User) {
    this.newUserNeeded = {status: false};
    this.currentUser = user;

    this.save();
  }

  clearUser() {    // Should only be temporary. For debugging.
    this.newUserNeeded = {status: true};
    this.currentUser = null;

    this.save();
  }

  save() {
    this.storage.ready()
      .then(() => {
        this.storage.set('user', this.currentUser);
        this.storage.set('user-status', this.newUserNeeded);
      })
  }

}
