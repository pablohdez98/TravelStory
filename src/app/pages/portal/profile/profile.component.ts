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
    this.serv.getUser().subscribe( user => {
      if (user) {
        this.serv.getTrips('idUser', '==', user.id).subscribe(async userTrips => {
          this.trips = await Promise.all(userTrips);
        });
      }
    });
  }

  async logOut() {
    await this.serv.logOut();
    localStorage.removeItem('user');
    await this.router.navigate(['logIn']);
  }
}
