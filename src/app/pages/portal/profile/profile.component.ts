import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../service/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  protected trips: any[];
  protected images: any[];
  constructor(protected serv: UsersService, private router: Router) {
    this.images = [];
  }

  ngOnInit() {
    this.serv.getTrips('idUser', '==', JSON.parse(localStorage.getItem('user')).id).subscribe(userTrips => {
      this.trips = userTrips;
      this.images = [];
      this.trips.forEach((trip, i) => {
        this.serv.getImage(trip.image).subscribe(image => {
          this.images[i] = image;
        });
      });
    });
  }

  async logOut() {
    await this.serv.logOut();
    localStorage.removeItem('user');
    await this.router.navigate(['logIn']);
  }
}
