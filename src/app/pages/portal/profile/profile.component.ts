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
    this.serv.getTrips().subscribe(userTrips => {
      this.trips = userTrips;
      this.trips.forEach(trip => {
        this.serv.getImage(trip.image).subscribe(image => {
          this.images.push(image);
        });
      });
    });
  }

  logOut() {
    this.serv.logOut().then(
        () => this.router.navigate(['logIn']),
        error => console.log(error)
    );
  }
}
