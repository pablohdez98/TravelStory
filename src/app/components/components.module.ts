import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BarComponent} from './bar/bar.component';
import {IonicModule} from '@ionic/angular';
import {NewCommentComponent} from './new-comment/new-comment.component';

@NgModule({
  declarations: [BarComponent, NewCommentComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [BarComponent, NewCommentComponent],
  entryComponents: [NewCommentComponent]
})
export class ComponentsModule { }
