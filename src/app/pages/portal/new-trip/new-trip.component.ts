import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {TripService} from '../../../services/trip/trip.service';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss'],
})
export class NewTripComponent implements OnInit {
  public countries: any[];
  protected selectedFile: File = null;
  public tripForm: any;

  constructor(private tripService: TripService, private formBuilder: FormBuilder, private router: Router,
              private alertController: AlertController) {
    this.countries = [
        {id: 0, country: 'España'},
        {id: 1, country: 'Alemania'},
        {id: 2, country: 'Francia'},
        {id: 3, country: 'Italia'},
        {id: 4, country: 'Inglaterra'},
        {id: 5, country: 'Turquía'},
        {id: 6, country: 'Polonia'},
        {id: 7, country: 'Bélgica'},
        {id: 8, country: 'Portugal'},
        {id: 9, country: 'Austria'},
        {id: 10, country: 'Noruega'},
        {id: 11, country: 'Holanda'},
        {id: 12, country: 'Hungría'},
    ];
  }
  ngOnInit() {
    this.tripForm = this.formBuilder.group({
      title: ['', Validators.required],
      countries: ['', Validators.required],
      initDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  async onSubmit(form) {
    if (this.tripForm.status === 'VALID') {
      await this.tripService.uploadTrip(form, this.selectedFile);
      await this.router.navigate(['portal/profile']);
    } else {
      const alert = await this.alertController.create({
        header: 'No se pudo crear el viaje',
        message: 'Asegurate de rellenar todos los campos correctamente',
        buttons: ['Vale']
      });
      await alert.present();
    }
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }
}
