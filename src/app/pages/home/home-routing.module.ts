import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePage} from './home.page';
import {ProfileComponent} from './profile/profile.component';
import {PortalComponent} from './portal/portal.component';
import {NewTripComponent} from './new-trip/new-trip.component';

const routes: Routes = [
  { path: '', component: HomePage, children: [
      { path: 'portal', component: PortalComponent},
      { path: 'newTrip', component: NewTripComponent},
      { path: 'profile', component: ProfileComponent}
    ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
