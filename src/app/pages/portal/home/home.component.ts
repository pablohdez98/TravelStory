import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../service/users.service';

@Component({
  selector: 'app-portal',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private trips: any[];
  private images: any[];
  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersService.getTrips().subscribe(trips => {
      this.trips = trips;
      this.images = [];
      this.trips.forEach((trip, i) => {
        this.usersService.getImage(trip.image).subscribe(image => {
          this.images[i] = image;
        });
      });
    });
  }

}
