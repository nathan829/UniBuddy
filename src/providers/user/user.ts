import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { User } from '../../models/user';

@Injectable()
export class UserProvider {

  users: Array<User>;

  constructor(public storage: Storage) {
    
  }

  getUsers(): Promise<Array<User>> {
    return new Promise<Array<User>>((resolve) =>{
      if(!this.users) {
        this.storage.ready()
          .then(() => {
            this.storage.get('users')
              .then(val => {
                this.users = val;
                if(!this.users) {
                  this.users = [];
                }
                resolve(this.users);
              })
          })
      }
      else {
        resolve(this.users);
      }
    });
  }

  addUser(user: User): boolean {
      for(var i = 0; i < this.users.length; ++i) {
        if(this.users[i].name == user.name) {
          return false;
        }
      }

      this.users.push(user);
      this.moveToStart(user);
      
      this.save();
      return true;
  }

  moveToStart(user: User) {
    var size = this.users.length;
    var index = this.getIndex(user);

    if(index >= size || index < 0) return;

    var removing = this.users[index];

    for(var i = index - 1; i >= 0; --i) {
      this.users[i+1] = this.users[i];
    }

    this.users[0] = removing;
    this.save();
  }

  removeUser(user: User) {
    var index = this.getIndex(user);

    if(index < 0) return;

    this.users.splice(index, 1);
    this.save();
  }

  private getIndex(user: User): number {
    if(!user) return -1;

    for(var i = 0; i < this.users.length; ++i) {
      if(user.name === this.users[i].name) {
        return i;
      }
    }

    return -1;
  }

  save() {
    this.storage.ready()
      .then(() => {
        this.storage.set('users', this.users);
      })
  }

}
