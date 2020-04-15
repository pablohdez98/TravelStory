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
  private idTrip: string;
  protected rates: any[];
  private alreadyCommented: boolean;
  private totalRate;

  constructor(private ruta: ActivatedRoute, private serv: UsersService, private modalController: ModalController) {
    this.trip = {};
  }

  ngOnInit() {
    let sum = 0;
    this.ruta.params.subscribe(async (p) => {
      this.idTrip = p.id;
      this.serv.getOneTrip(this.idTrip).subscribe(async resp => {
        this.trip = await resp;
      });
      this.serv.getRates(p.id).subscribe(rates => {
        this.rates = rates;
        this.rates.forEach(rate => {
          sum += Number(rate.rate);
        });
        this.totalRate = Math.round(sum / this.rates.length);
      });
      this.serv.getUser().subscribe(user => {
        if (user) {
          this.serv.checkComments(p.id, user.id).subscribe(data => {
            this.alreadyCommented = data.length > 0;
          });
        }
      });
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NewCommentComponent,
      componentProps: {
        idTrip: this.idTrip
      }
    });
    return await modal.present();
  }
}
