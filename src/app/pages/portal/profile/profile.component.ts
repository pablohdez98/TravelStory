import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {Router} from '@angular/router';
import {TripService} from '../../../services/trip/trip.service';
import {ToastController} from '@ionic/angular';
import {Trip} from '../../../services/trip/trip';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public trips: Trip[];
  public userName: string;
  constructor(private userService: UserService, private tripService: TripService, private router: Router,
              private toastController: ToastController) {
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe( user => {
      if (user) {
        this.userName = user.name;
        this.tripService.getTrips(false, 'idUser', user.id, '==').subscribe(async userTrips => {
          this.trips = await Promise.all(userTrips);
        });
      }
    });
  }

  async deleteTrip(trip) {
    await this.tripService.deleteTrip(trip);
    const toast = await this.toastController.create({
      message: 'Viaje eliminado',
      color: 'dark',
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }

  async logOut() {
    await this.userService.logOut();
    localStorage.removeItem('user');
    await this.router.navigate(['logIn']);
  }
}
