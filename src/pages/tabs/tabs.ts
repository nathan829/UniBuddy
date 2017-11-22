import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { FlashCardsPage } from '../flash-cards/flash-cards';
import { NotesPage } from '../notes/notes';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { TimetablePage } from '../timetable/timetable';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TimetablePage;
  tab3Root = NotesPage;
  tab4Root = FlashCardsPage;
  tab5Root = SettingsPage;
  
  constructor(public navCtrl: NavController) {

  }

  tabChanged() {
    
  }
  
}
