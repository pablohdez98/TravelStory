import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BarComponent} from './bar/bar.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [BarComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [BarComponent]
})
export class ComponentsModule { }
