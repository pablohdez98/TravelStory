import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../../service/users.service';
import {ModalController} from '@ionic/angular';
import {NewCommentComponent} from '../../../components/new-comment/new-comment.component';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.scss'],
})
export class TripViewComponent implements OnInit {
  private trip: any;
  private image: any;
  protected rates: any[];
  private alreadyCommented: boolean;

  constructor(private ruta: ActivatedRoute, private serv: UsersService, private modalController: ModalController) {
    this.trip = {};
  }

  ngOnInit() {
    this.ruta.params.subscribe(async (p) => {
      this.serv.getOneTrip(p.id).subscribe(resp => {
        this.trip = resp;
        this.serv.getImage(this.trip.image).subscribe(image => {
          this.image = image;
        });
      });
      this.serv.getRates(p.id).subscribe(rates => this.rates = rates);
      this.serv.checkComments(p.id, 'kzld2oYQm4SSBVvTyOn2jqKIrXM2-').subscribe(data => {
        this.alreadyCommented = data.length > 0;
      });
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NewCommentComponent
    });
    return await modal.present();
  }
}
