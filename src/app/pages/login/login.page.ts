import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  protected loginForm: any;
  constructor(public form: FormBuilder) {
    this.loginForm = this.form.group({
          nombre: '',
          contraseña: '',
        }
    );
  }
  ngOnInit() {
  }
  onSubmit(form) {
    console.log(form);
  }

}
