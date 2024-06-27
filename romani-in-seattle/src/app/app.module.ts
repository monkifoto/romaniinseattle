import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesComponent } from './components/Servicii/services/services.component';
import { RulesComponent } from './components/rules/rules.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { EventsComponent } from './components/Evenimente/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OffersComponent } from './components/Oferte/offers/offers.component';
import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideStorage, getStorage} from '@angular/fire/storage';
import { FooterComponent } from './components/footer/footer.component';
import { AddServiceComponent } from './components/Servicii/add-service/add-service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEventComponent } from './components/Evenimente/add-event/add-event.component';
import { AddOffersComponent } from './components/Oferte/add-offers/add-offers.component';
import { EditServicesComponent } from './components/Servicii/edit-services/edit-services.component';
import { OfferCardComponent } from './components/Oferte/offer-card/offer-card.component';
import { AnalyticsComponent } from './components/Admin/analytics/analytics.component';
import { OfferDetailComponent } from './components/Oferte/offer-detail/offer-detail.component';
import { ServiceDetailComponent } from './components/Servicii/service-detail/service-detail.component';
import { ServiceCardComponent } from './components/Servicii/service-card/service-card.component';
import { LoginComponent } from './components/Admin/login/login.component';

import { ServicesManagementComponent } from './components/Admin/manage-services/manage-services.component';
import { OfferManagementComponent } from './components/Admin/offer-management/offer-management.component';
import { EventManagementComponent } from './components/Admin/event-management/event-management.component';
import { EventCardComponent } from './components/Evenimente/event-card/event-card.component';
import { TestComponent } from './components/Admin/test/test/test.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServicesComponent,
    RulesComponent,
    NavigationComponent,
    EventsComponent,
    OffersComponent,
    FooterComponent,
    AddServiceComponent,
    AddEventComponent,
    AddOffersComponent,
    EditServicesComponent,
    OfferCardComponent,
    AnalyticsComponent,
    OfferDetailComponent,
    ServiceDetailComponent,
    ServiceCardComponent,
    LoginComponent,
    ServicesManagementComponent,
    OfferManagementComponent,
    EventManagementComponent,
    EventCardComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(()=> initializeApp(environment.firebase)),
    provideFirestore(()=>getFirestore()),
    provideStorage(()=> getStorage()),
    ReactiveFormsModule,
    FormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
