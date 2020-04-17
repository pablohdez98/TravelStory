import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './logIn.page.html',
  styleUrls: ['./logIn.page.scss'],
})
export class LogInPage implements OnInit {
  public loginForm: FormGroup;
  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router,
              private alertController: AlertController) {}

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    });
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  async onSubmit(form) {
    this.userService.logIn(form.email, form.password).then(
        () => { this.router.navigate(['portal/home']); },
        async () => {
          const alert = await this.alertController.create({
            header: 'Falló el inicio de sesión',
            message: 'El email o la contraseña son incorrectos',
            buttons: ['Vale']
          });
          await alert.present();
        }
    );
  }

  async googleLogIn() {
    await this.userService.googleLogIn();
    await this.router.navigate(['portal/home']);
  }
}
