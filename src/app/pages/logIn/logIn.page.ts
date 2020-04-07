import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UsersService} from '../../service/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './logIn.page.html',
  styleUrls: ['./logIn.page.scss'],
})
export class LogInPage implements OnInit {
  protected loginForm: any;
  constructor(public form: FormBuilder, protected serv: UsersService, public router: Router ) {
    this.loginForm = this.form.group({
          email: '',
          password: '',
        }
    );
  }
  ngOnInit() {
  }

  onSubmit(form) {
    this.serv.logIn(form.email, form.password).then(
        () => this.router.navigate(['portal/home']),
        error => console.log(error));
  }
}
