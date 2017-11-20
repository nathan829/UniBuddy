import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';

import { TimetablePage } from '../pages/timetable/timetable';
import { NotesPage } from '../pages/notes/notes';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { FlashCardsPage } from '../pages/flash-cards/flash-cards';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { CreateUserPage } from '../pages/create-user/create-user';
import { BlankPage } from '../pages/blank/blank';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SettingsProvider } from '../providers/settings/settings';
import { StateProvider } from '../providers/state/state';
import { UserProvider } from '../providers/user/user';

@NgModule({
  declarations: [
    MyApp,
    TimetablePage,
    NotesPage,
    HomePage,
    TabsPage,
    SettingsPage,
    FlashCardsPage,
    UserProfilePage,
    CreateUserPage,
    BlankPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TimetablePage,
    NotesPage,
    HomePage,
    TabsPage,
    SettingsPage,
    FlashCardsPage,
    UserProfilePage,
    CreateUserPage,
    BlankPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingsProvider,
    StateProvider,
    UserProvider
  ]
})
export class AppModule {}
