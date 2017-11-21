import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';
import { Subject } from '../../models/subject';

@IonicPage()
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage {

  name: string;

  subjects: Subject[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController ) {

    this.name = navParams.get('user').name;
    this.subjects = [];

    navParams.get('user').subjects.forEach(subject => {
      this.subjects.push(subject);
    });
  }

  cancel() {
    this.navCtrl.pop();
  }

  save() {
    var user = {name: this.name, subjects: this.subjects};
    this.viewCtrl.dismiss(user);
  }

  nextToAdd(index: number): boolean {
    return this.subjects.length == index-1;
  }

  addButtonPressed() {
    this.subjects.push({code: 'COMP110', name: 'science'});
  }

  cellVisible(index: number): boolean {
    if(index-1 <= this.subjects.length) {
      return true;
    }
    return false;
  }

}
