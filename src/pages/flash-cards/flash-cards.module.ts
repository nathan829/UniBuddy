import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlashCardsPage } from './flash-cards';

@NgModule({
  declarations: [
    FlashCardsPage,
  ],
  imports: [
    IonicPageModule.forChild(FlashCardsPage),
  ],
})
export class FlashCardsPageModule {}
