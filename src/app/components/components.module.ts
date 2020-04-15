import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BarComponent} from './bar/bar.component';
import {IonicModule} from '@ionic/angular';
import {NewCommentComponent} from './new-comment/new-comment.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [BarComponent, NewCommentComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [BarComponent, NewCommentComponent],
  entryComponents: [NewCommentComponent]
})
export class ComponentsModule { }
