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
import { EventDetailComponent } from './components/Evenimente/event-detail/event-detail.component';
import { EventEditComponent } from './components/Evenimente/event-edit/event-edit.component';
import { TestPageComponent } from './components/test-page/test-page.component';



const routes: Routes = [
  { path: '', component: HomeComponent , title: 'Romani în Seattle - Acasa' },

  { path: 'rules', component: RulesComponent, title: 'Romani în Seattle - Reguli' },
  { path: 'analytics', component: AnalyticsComponent  , title: 'Romani în Seattle - Acasa' },

  { path: 'events', component: EventsComponent , title: 'Romani în Seattle - Evenimente' },
  { path: 'add-event', component: AddEventComponent  , title: 'Romani în Seattle - Adauga Eveniment' },
  { path: 'events/add', component: AddEventComponent  , title: 'Romani în Seattle -  Adauga Eveniment' },
  { path: 'events/:id', component: EventDetailComponent , title: 'Romani în Seattle - Detalii Eveniment' },
  { path: 'edit-event/:id', component: EventEditComponent , title: 'Romani în Seattle - Editare Eveniment' },


  { path: 'offers', component: OffersComponent  , title: 'Romani în Seattle - Acasa' },
  { path: 'add-offers', component: AddOffersComponent  , title: 'Romani în Seattle - Adauga Oferta' },
  { path: 'offers/add', component: AddOffersComponent  , title: 'Romani în Seattle - Adauga Oferta' },
  { path: 'offers/:id', component: OfferDetailComponent  , title: 'Romani în Seattle - Detalii Oferta' },
  { path: 'edit-oferte/:id', component: EditOferteComponent , title: 'Romani în Seattle - Editare Oferta' },

  { path: 'services', component: ServicesComponent  , title: 'Romani în Seattle - Servicii' },
  { path: 'add-service', component: AddServiceComponent  , title: 'Romani în Seattle - Adauga Serviciu' },
  { path: 'services/add', component: AddServiceComponent  , title: 'Romani în Seattle - Adauga Serviciu' },
  { path: 'services/:id', component: ServiceDetailComponent  , title: 'Romani în Seattle - Detalii Serviciu' },
  { path: 'edit-service/:id', component: EditServicesComponent  , title: 'Romani în Seattle - Editate Serviciu' },


 { path: 'test', component: TestComponent},
 { path: 'test-page', component: TestPageComponent},
 { path: 'test-page/:id', component: TestPageComponent },

{ path: 'login', component: LoginComponent  , title: 'Romani în Seattle - Logare' },
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{path: 'admin',loadChildren:() => import ('./Modules/admin/admin.module').then(m=>m.AdminModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
