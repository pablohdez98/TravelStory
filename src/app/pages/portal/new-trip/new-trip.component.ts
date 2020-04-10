import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireStorage} from '@angular/fire/storage';
import {UsersService} from '../../../service/users.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss'],
})
export class NewTripComponent implements OnInit {
  protected countries: any[];
  protected selectedCountries: any[];
  protected selectedFile: File = null;
  protected tripForm: any;

  constructor(private http: HttpClient, private afs: AngularFireStorage, private serv: UsersService,
              private formBuilder: FormBuilder) {
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
      title: '',
      countries: '',
      initDate: '',
      endDate: '',
      description: ''
    });
  }

  onSubmit(form) {
    this.serv.uploadTrip(form, this.selectedFile);
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }
}
