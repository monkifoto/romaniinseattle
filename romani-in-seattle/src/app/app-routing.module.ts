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
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { OfferDetailComponent } from './components/offer-detail/offer-detail.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'rules', component: RulesComponent },
  { path: 'analytics', component: AnalyticsComponent },

  { path: 'events', component: EventsComponent},
  { path: 'add-event', component: AddEventComponent },

  { path: 'offers', component: OffersComponent },
  { path: 'add-offers', component: AddOffersComponent },
  { path: 'offers/:id', component: OfferDetailComponent },

  { path: 'services', component: ServicesComponent },
  { path: 'add-service', component: AddServiceComponent },
  { path: 'services/add', component: AddServiceComponent },
  { path: 'services/:id', component: ServiceDetailComponent },
  { path: 'edit-service/:id', component: EditServicesComponent },
 // { path: '', redirectTo: '/services', pathMatch: 'full' },
  // { path: '', redirectTo: '/offers', pathMatch: 'full' },
 // { path: '**', redirectTo: '/offers' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
