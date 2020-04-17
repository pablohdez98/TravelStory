import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TripService} from '../../../services/trip/trip.service';

@Component({
  selector: 'app-portal',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  protected trips: any[];
  private search: BehaviorSubject<string>;
  private orderBy: string;

  constructor(private tripService: TripService) {
    this.orderBy = 'title';
    this.search = new BehaviorSubject<string>('');
  }

  ngOnInit() {
    this.search.subscribe(querySearch => {
      this.tripService.getTrips(true, 'title', querySearch ).subscribe(async trips => {
        this.trips = await Promise.all(trips);
      });
    });
  }

  async busca(event) {
    this.search.next(event.target.value);
  }
  changeOrder() {
    if (this.orderBy === 'title') {
      this.trips.sort((a, b) => {
        if (a[this.orderBy] >= b[this.orderBy]) {
          return 1;
        } else {
          return -1;
        }
      });
    } else {
      this.trips.sort((a, b) => {
        if (a[this.orderBy] >= b[this.orderBy]) {
          return -1;
        } else {
          return 1;
        }
      });
    }
  }
}
