import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import {ComponentsModule} from '../../components/components.module';
import {HomeRoutingModule} from './home-routing.module';
import {ProfileComponent} from './profile/profile.component';
import {PortalComponent} from './portal/portal.component';
import {NewTripComponent} from './new-trip/new-trip.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    HomeRoutingModule
  ],
  declarations: [HomePage, PortalComponent, NewTripComponent, ProfileComponent]
})
export class HomePageModule {}
