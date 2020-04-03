import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UsersService} from '../../service/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  private signUpForm;

  constructor(public formBuilder: FormBuilder,
              public usersService: UsersService) {
    this.signUpForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit() {
  }
  onSubmit(form) {
    this.usersService.signUp(form.email, form.password);
  }

}
