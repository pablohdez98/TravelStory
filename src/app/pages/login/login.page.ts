import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UsersService} from '../../service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  protected loginForm: any;
  constructor(public form: FormBuilder, protected serv: UsersService) {
    this.loginForm = this.form.group({
          email: '',
          contraseña: '',
        }
    );
  }
  ngOnInit() {
  }
  onSubmit(form) {
    this.serv.signIn(form.email, form.contraseña);
  }

}
