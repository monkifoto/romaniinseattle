import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/Servicii/services/services.component';
import { RulesComponent } from './components/rules/rules.component';
import { EventsComponent } from './components/Evenimente/events/events.component';
import { OffersComponent } from './components/Oferte/offers/offers.component';
import { AddServiceComponent } from './components/Servicii/add-service/add-service.component';
import { AddEventComponent } from './components/Evenimente/add-event/add-event.component';
import { AddOffersComponent } from './components/Oferte/add-offers/add-offers.component';
import { EditServicesComponent } from './components/Servicii/edit-services/edit-services.component';
import { AnalyticsComponent } from './components/Admin/analytics/analytics.component';
import { OfferDetailComponent } from './components/Oferte/offer-detail/offer-detail.component';
import { ServiceDetailComponent } from './components/Servicii/service-detail/service-detail.component';
import { adminAuthGuard } from './Guard/admin-auth.guard';
import { AdminComponent } from './components/Admin/admin/admin.component';
import { LoginComponent } from './components/Admin/login/login.component';
import { ServicesManagementComponent } from './components/Admin/manage-services/manage-services.component';
import { OfferManagementComponent } from './components/Admin/offer-management/offer-management.component';
import { EventManagementComponent } from './components/Admin/event-management/event-management.component';
import { TestComponent } from './components/Admin/test/test/test.component';
import { AdminRoutingModule } from './Modules/admin/admin-routing.module';
import { EditOferteComponent } from './components/Oferte/edit-oferte/edit-oferte.component';



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
  { path: 'edit-oferte/:id', component: EditOferteComponent},
 { path: 'test', component: TestComponent},

{ path: 'login', component: LoginComponent },
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{path: 'admin',loadChildren:() => import ('./Modules/admin/admin.module').then(m=>m.AdminModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
