import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController, NavController, NavParams } from 'ionic-angular';

import { Subject } from '../../models/subject';

@IonicPage()
@Component({
  selector: 'page-subject',
  templateUrl: 'subject.html',
})
export class SubjectPage {

  code: string;
  name: string;
  title: string;
  changesMade: boolean;

  codeErrors: string[];
  nameErrors: string[];

  codeBefore: string;
  nameBefore: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController) {
    this.name = navParams.get('subject').name;
    this.code = navParams.get('subject').code;
    
    this.nameBefore = this.name;
    this.codeBefore = this.code;

    this.codeErrors = [];
    this.nameErrors = [];

    this.title = 'Subject';
    this.changesMade = false;
  } 

  cancel() {
    if(this.code.trim() != this.codeBefore || this.name.trim() != this.nameBefore) {
      let confirmation = this.alertCtrl.create({
        title: 'Confirmation',
        message: 'Abandon your changes?'
      });

      confirmation.addButton({
        text: 'Go Back'
      });
      confirmation.addButton({
        text: 'Okay',
        handler: data => {
          this.navCtrl.pop();
        }
      });

      confirmation.present();
    }
    else {
      this.navCtrl.pop();
    }
  }

  accept() {
    this.validate();

    if(this.codeErrors.length == 0 && this.nameErrors.length == 0) {
      var returning = {name: this.name.trim(), code: this.code.trim()};
      this.viewCtrl.dismiss(returning);
    }
  }

  validate() {
    if(this.code.length < 4) {
      this.codeErrors = ['4 characters minimum'];
    }

    if(this.name.length < 4) {
      this.nameErrors = ['4 characters minimum'];
    }
  }

  codeChanged() {
    this.codeErrors = [];
  }

  nameChanged() {
    this.nameErrors = [];
  }

}
