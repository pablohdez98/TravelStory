import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BarComponent} from './bar/bar.component';
import {NavComponent} from './nav/nav.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [BarComponent, NavComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [BarComponent, NavComponent]
})
export class ComponentsModule { }
