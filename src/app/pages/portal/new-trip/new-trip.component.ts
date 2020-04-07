import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss'],
})
export class NewTripComponent implements OnInit {
  protected countries: any[];
  protected selectedUser: any[];

  constructor() {
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
  ngOnInit() {}

}
