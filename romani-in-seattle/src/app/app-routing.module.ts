import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { RulesComponent } from './components/rules/rules.component';
import { EventsComponent } from './components/events/events.component';
import { OffersComponent } from './components/offers/offers.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddOffersComponent } from './components/add-offers/add-offers.component';
import { EditServicesComponent } from './components/edit-services/edit-services.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'events', component: EventsComponent},
  { path: 'offers', component: OffersComponent},
  { path: 'add-service', component: AddServiceComponent },
  {path: 'add-event', component: AddEventComponent },
  { path: 'add-offers', component: AddOffersComponent },
  { path: 'edit-service/:id', component: EditServicesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
