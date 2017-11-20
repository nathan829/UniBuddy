import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage {

  name: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController ) {

    this.name = navParams.get('user').name;
    console.log('passed ' + JSON.stringify(navParams.get('user')));
  }

  cancel() {
    this.navCtrl.pop();
  }

  save() {
    var user = {name: this.name};
    this.viewCtrl.dismiss(user);
  }

}
