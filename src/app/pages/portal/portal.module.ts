import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { PortalPage } from './portal.page';
import {ComponentsModule} from '../../components/components.module';
import {PortalRoutingModule} from './portal-routing.module';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';
import {NewTripComponent} from './new-trip/new-trip.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PortalRoutingModule
  ],
  declarations: [PortalPage, HomeComponent, NewTripComponent, ProfileComponent]
})
export class HomePageModule {}
