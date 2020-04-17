import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder} from '@angular/forms';
import {RateService} from '../../services/rate/rate.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss'],
})
export class NewCommentComponent implements OnInit {
  idTrip;
  private rateForm: any;

  constructor(private modalController: ModalController, private rateService: RateService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.rateForm = this.formBuilder.group({
      rate: '',
      comment: '',
      idTrip: this.idTrip
    });
  }

  async dismissModal() {
    await this.modalController.dismiss({
      dismissed: true
    });
  }

  async onSubmit(form) {
    await this.rateService.createRate(form);
    await this.dismissModal();
  }

}
