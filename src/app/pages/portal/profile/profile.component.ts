import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../service/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor(protected serv: UsersService, public router: Router) { }

  ngOnInit() {}

  logOut() {
    this.serv.logOut().then(
        () => this.router.navigate(['logIn']),
        error => console.log(error)
    );
  }
}
