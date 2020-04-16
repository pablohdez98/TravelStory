import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../service/users.service';
import {BehaviorSubject} from 'rxjs';
import {IonSelect} from '@ionic/angular';

@Component({
  selector: 'app-portal',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private trips: any[];
  private search: BehaviorSubject<string>;
  private orderBy: string;
  constructor(
    private usersService: UsersService,
  ) {
    this.orderBy = 'title';
    this.search = new BehaviorSubject<string>('');
  }

  ngOnInit() {
    this.search.subscribe(querySearch => {
      this.usersService.getTrips(true, 'title', querySearch ).subscribe(async trips => {
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
