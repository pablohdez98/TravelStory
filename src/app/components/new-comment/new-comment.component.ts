import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss'],
})
export class NewCommentComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async dismissModal() {
    await this.modalController.dismiss({
      dismissed: true
    });
  }

}
