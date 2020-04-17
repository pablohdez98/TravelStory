import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user/user.service';
import {ModalController} from '@ionic/angular';
import {NewCommentComponent} from '../../../components/new-comment/new-comment.component';
import {TripService} from '../../../services/trip/trip.service';
import {RateService} from '../../../services/rate/rate.service';
import {Rate} from '../../../services/rate/rate';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.scss'],
})
export class TripViewComponent implements OnInit {
  private trip: any;
  private idTrip: string;
  private idUser: string;
  private rates: Rate[];
  private alreadyCommented: boolean;
  private totalRate;

  constructor(private userService: UserService, private tripService: TripService, private rateService: RateService,
              private ruta: ActivatedRoute, private modalController: ModalController) {
    this.trip = {};
  }

  ngOnInit() {
    this.ruta.params.subscribe(async (p) => {
      this.idTrip = p.id;
      this.tripService.getOneTrip(this.idTrip).subscribe(async resp => {
        if (await resp) {
          this.trip = await resp;
          this.rateService.getRates(p.id).subscribe(rates => {
            this.rates = rates;
            this.totalRate = this.trip.meanRate ?  this.trip.meanRate : 'Sin valoraciones';
          });
          this.userService.getUser().subscribe(user => {
            if (user) {
              this.idUser = user.id;
              this.rateService.checkComments(p.id, user.id).subscribe(data => {
                this.alreadyCommented = data.length > 0;
              });
            }
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
