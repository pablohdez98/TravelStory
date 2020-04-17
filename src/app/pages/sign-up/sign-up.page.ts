import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public signUpForm;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router,
              private alertController: AlertController) {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async onSubmit(form) {
    if (this.signUpForm.status === 'VALID') {
      await this.userService.signUp(form);
      await this.router.navigate(['portal/home']);
    } else {
      const alert = await this.alertController.create({
        header: 'No se pudo crear el usuario',
        message: 'Asegurate de rellenar todos los campos correctamente',
        buttons: ['Vale']
      });
      await alert.present();
    }
  }
}
